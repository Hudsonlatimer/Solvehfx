import Anthropic from '@anthropic-ai/sdk';

function getClient() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  });
}

export async function analyzePhoto(
  imageBase64: string,
  mimeType: string
): Promise<{ category: string; title: string; description: string; confidence: number }> {
  const response = await getClient().messages.create({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 500,
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

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return JSON.parse(text);
}
