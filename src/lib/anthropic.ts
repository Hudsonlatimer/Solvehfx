import Anthropic from '@anthropic-ai/sdk';
import { ISSUE_CATEGORIES, type AnalyzePhotoResponse } from './types';

// Current-generation vision model. Keep in sync with CLAUDE.md.
const MODEL = 'claude-sonnet-4-6';

const VALID_CATEGORY_IDS = new Set<string>(ISSUE_CATEGORIES.map((c) => c.id));

function getClient() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  });
}

/**
 * Pull a JSON object out of a model response that may be wrapped in markdown
 * fences or surrounded by prose. Returns null if nothing parseable is found.
 */
function extractJson(text: string): Record<string, unknown> | null {
  if (!text) return null;

  // Strip ```json ... ``` or ``` ... ``` fences if present.
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = (fenced ? fenced[1] : text).trim();

  // Fall back to the first {...last } span so trailing prose can't break parsing.
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  const slice = start !== -1 && end !== -1 && end > start ? candidate.slice(start, end + 1) : candidate;

  try {
    return JSON.parse(slice);
  } catch {
    return null;
  }
}

export async function analyzePhoto(
  imageBase64: string,
  mimeType: string
): Promise<AnalyzePhotoResponse> {
  const response = await getClient().messages.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              data: imageBase64,
            },
          },
          {
            type: 'text',
            text: `You are analyzing a photo submitted by a Halifax, Nova Scotia resident to report a civic issue.

Analyze this photo and return ONLY a JSON object with these exact fields:
{
  "category": "<one of the exact category IDs from the list below>",
  "title": "<short 5-8 word title describing the specific issue>",
  "description": "<2-3 sentence professional description of the issue, its location characteristics, and why it needs attention>",
  "confidence": <0.0 to 1.0>
}

Valid category IDs: pothole, road_damage, sidewalk_damage, snow_ice, graffiti, illegal_dumping, garbage_overflow, street_light, traffic_sign, abandoned_vehicle, parking_violation, tree_issue, parks_issue, water_drainage, water_sewer, property_standards, bus_stop, transit_complaint, bike_lane, debris, dog_fouling, flyposting, noise_complaint, road_blockage, public_toilet, utility_pole, waterfront, other

Return ONLY the JSON object. No markdown, no explanation.`,
          },
        ],
      },
    ],
  });

  const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
  const parsed = extractJson(text);

  if (!parsed) {
    throw new Error('AI returned an unparseable response.');
  }

  // Coerce/validate the fields so a malformed model response can't poison the UI.
  const rawCategory = typeof parsed.category === 'string' ? parsed.category : 'other';
  const category = VALID_CATEGORY_IDS.has(rawCategory) ? rawCategory : 'other';

  const title = typeof parsed.title === 'string' ? parsed.title.trim() : '';
  const description = typeof parsed.description === 'string' ? parsed.description.trim() : '';

  let confidence = typeof parsed.confidence === 'number' ? parsed.confidence : 0;
  if (!Number.isFinite(confidence)) confidence = 0;
  confidence = Math.min(1, Math.max(0, confidence));

  return { category, title, description, confidence };
}
