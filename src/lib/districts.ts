import type { District, RoadAuthority } from './types';
import { ISSUE_CATEGORIES } from './types';

export const HRM_DISTRICTS: District[] = [
  { id: 1, name: 'Waverley-Fall River-Musquodoboit Valley', councillor_name: 'Cathy Deagle Gammon', councillor_email: 'c.deaglegammon@halifax.ca' },
  { id: 2, name: 'Lawrencetown-The Lakes-Chezzetcook-Eastern Shore', councillor_name: 'David Hendsbee', councillor_email: 'd.hendsbee@halifax.ca' },
  { id: 3, name: 'Dartmouth South-Woodside-Eastern Passage', councillor_name: 'Becky Kent', councillor_email: 'b.kent@halifax.ca' },
  { id: 4, name: 'Cole Harbour-Preston-Westphal-Cherry Brook', councillor_name: 'Trish Purdy', councillor_email: 't.purdy@halifax.ca' },
  { id: 5, name: 'Dartmouth Centre', councillor_name: 'Sam Austin', councillor_email: 's.austin@halifax.ca' },
  { id: 6, name: 'Dartmouth East-Burnside', councillor_name: 'Tony Mancini', councillor_email: 't.mancini@halifax.ca' },
  { id: 7, name: 'Halifax South Downtown', councillor_name: 'Laura White', councillor_email: 'l.white@halifax.ca' },
  { id: 8, name: 'Halifax Peninsula North', councillor_name: 'Virginia Hinch', councillor_email: 'v.hinch@halifax.ca' },
  { id: 9, name: 'Halifax West Armdale', councillor_name: 'Shawn Cleary', councillor_email: 's.cleary@halifax.ca' },
  { id: 10, name: 'Halifax-Bedford Basin West', councillor_name: 'Kathryn Morse', councillor_email: 'k.morse@halifax.ca' },
  { id: 11, name: 'Spryfield-Sambro Loop-Prospect Road', councillor_name: 'Patty Cuttell', councillor_email: 'p.cuttell@halifax.ca' },
  { id: 12, name: 'Timberlea-Beechville-Clayton Park-Wedgewood', councillor_name: 'Janet Steele', councillor_email: 'j.steele@halifax.ca' },
  { id: 13, name: 'Prospect Road-St. Margarets', councillor_name: 'Nancy Hartling', councillor_email: 'n.hartling@halifax.ca' },
  { id: 14, name: 'Hammonds Plains-Lucasville-Middle & Upper Sackville', councillor_name: 'John A. Young', councillor_email: 'j.young@halifax.ca' },
  { id: 15, name: 'Lower Sackville-Beaver Bank', councillor_name: 'Billy Gillis', councillor_email: 'b.gillis@halifax.ca' },
  { id: 16, name: 'Bedford-Wentworth', councillor_name: 'Jean St-Amand', councillor_email: 'j.stamand@halifax.ca' },
];

export function getCategoryById(id: string) {
  return ISSUE_CATEGORIES.find((c) => c.id === id);
}

// Known provincial roads and bridges (fallback for when dataset lookup unavailable)
const PROVINCIAL_ROADS = [
  'McKay', 'Macdonald', 'Macdonalds', 'Highway', 'Hwy',
  'Trans-Canada', 'TCH', 'A-104', 'A-102', 'A-100',
  'A-104', 'A-107', 'A-109', 'A-111', 'A-113',
  'Route 2', 'Route 3', 'Route 7', 'Route 19', 'Dunbrack'
];

async function lookupRoadOwnership(address: string): Promise<'PROV' | 'HRM' | null> {
  // TODO: Integrate Nova Scotia Street Centrelines dataset (OWN field)
  // When available, call the dataset API with the street name
  // Parse response to check if OWN === 'PROV' or 'HRM'
  // For now, returns null to use fallback logic
  return null;
}

function isProvincialRoad(address: string | null | undefined): boolean {
  if (!address) return false;
  const addressUpper = address.toUpperCase();
  return PROVINCIAL_ROADS.some(road => addressUpper.includes(road.toUpperCase()));
}

export async function determineAuthority(categoryId: string, isHighway: boolean = false, address?: string | null): Promise<RoadAuthority> {
  const category = getCategoryById(categoryId);
  if (!category) return 'hrm';

  if (category.authority === 'transit') return 'transit';
  if (category.authority === 'auto') {
    // Try dataset lookup first (Nova Scotia Street Centrelines OWN field)
    if (address) {
      const ownership = await lookupRoadOwnership(address);
      if (ownership === 'PROV') return 'province';
      if (ownership === 'HRM') return 'hrm';
    }
    // Fallback: keyword matching + isHighway flag
    if (isProvincialRoad(address)) return 'province';
    return isHighway ? 'province' : 'hrm';
  }
  return 'hrm';
}

export function getDistrictById(id: number): District | undefined {
  return HRM_DISTRICTS.find((d) => d.id === id);
}
