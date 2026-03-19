export type ReportStatus = 'open' | 'in_progress' | 'resolved';
export type RoadAuthority = 'hrm' | 'province' | 'transit';

export interface Report {
  id: string;
  user_id: string | null;
  reference_number: string;
  title: string;
  description: string;
  category: string;
  lat: number;
  lng: number;
  address: string | null;
  district_id: number | null;
  road_authority: RoadAuthority;
  photo_url: string | null;
  status: ReportStatus;
  is_anonymous: boolean;
  created_at: string;
  resolved_at: string | null;
  districts?: District;
  verifications?: Verification[];
  resolution_notes?: ResolutionNote[];
}

export interface District {
  id: number;
  name: string;
  councillor_name: string | null;
  councillor_email: string | null;
}

export interface Verification {
  id: string;
  report_id: string;
  user_id: string | null;
  type: 'confirmed_exists' | 'confirmed_fixed';
  photo_url: string | null;
  created_at: string;
}

export interface ResolutionNote {
  id: string;
  report_id: string;
  note: string;
  created_at: string;
}

export interface AnalyzePhotoResponse {
  category: string;
  title: string;
  description: string;
  confidence: number;
}

export interface DistrictLookupResponse {
  district: District | null;
  road_authority: RoadAuthority;
}

export interface IssueCategory {
  id: string;
  label: string;
  icon: string;
  authority: 'hrm' | 'province' | 'transit' | 'auto';
}

export const ISSUE_CATEGORIES = [
  { id: 'pothole', label: 'Pothole', icon: '🕳️', authority: 'auto' },
  { id: 'road_damage', label: 'Road Damage', icon: '🛣️', authority: 'auto' },
  { id: 'sidewalk_damage', label: 'Sidewalk Damage', icon: '🚶', authority: 'hrm' },
  { id: 'snow_ice', label: 'Snow / Ice', icon: '🧊', authority: 'hrm' },
  { id: 'graffiti', label: 'Graffiti', icon: '🖊️', authority: 'hrm' },
  { id: 'illegal_dumping', label: 'Illegal Dumping', icon: '🗑️', authority: 'hrm' },
  { id: 'garbage_overflow', label: 'Garbage Overflow', icon: '♻️', authority: 'hrm' },
  { id: 'street_light', label: 'Street Light Outage', icon: '💡', authority: 'hrm' },
  { id: 'traffic_sign', label: 'Traffic Sign', icon: '🚦', authority: 'hrm' },
  { id: 'abandoned_vehicle', label: 'Abandoned Vehicle', icon: '🚗', authority: 'hrm' },
  { id: 'parking_violation', label: 'Parking Violation', icon: '🅿️', authority: 'hrm' },
  { id: 'tree_issue', label: 'Tree Issue', icon: '🌳', authority: 'hrm' },
  { id: 'parks_issue', label: 'Parks Issue', icon: '🌿', authority: 'hrm' },
  { id: 'water_drainage', label: 'Water / Flooding', icon: '💧', authority: 'hrm' },
  { id: 'water_sewer', label: 'Water / Sewer', icon: '🔧', authority: 'hrm' },
  { id: 'property_standards', label: 'Property Standards', icon: '🏚️', authority: 'hrm' },
  { id: 'bus_stop', label: 'Bus Stop Issue', icon: '🚌', authority: 'transit' },
  { id: 'transit_complaint', label: 'Transit Complaint', icon: '🚍', authority: 'transit' },
  { id: 'bike_lane', label: 'Bike Lane Issue', icon: '🚲', authority: 'hrm' },
  { id: 'debris', label: 'Debris / Litter', icon: '🧹', authority: 'hrm' },
  { id: 'dog_fouling', label: 'Dog Fouling', icon: '🐕', authority: 'hrm' },
  { id: 'flyposting', label: 'Illegal Signage', icon: '📋', authority: 'hrm' },
  { id: 'noise_complaint', label: 'Noise Complaint', icon: '🔊', authority: 'hrm' },
  { id: 'road_blockage', label: 'Road Blockage', icon: '🚧', authority: 'hrm' },
  { id: 'public_toilet', label: 'Public Washroom', icon: '🚻', authority: 'hrm' },
  { id: 'utility_pole', label: 'Utility Pole', icon: '⚡', authority: 'hrm' },
  { id: 'waterfront', label: 'Waterfront Issue', icon: '⚓', authority: 'hrm' },
  { id: 'other', label: 'Other', icon: '📍', authority: 'hrm' },
] as const;

export type CategoryId = (typeof ISSUE_CATEGORIES)[number]['id'];

export const AUTHORITY_EMAILS: Record<RoadAuthority, { email: string; name: string }> = {
  hrm: { email: 'contactus@311.halifax.ca', name: 'HRM 311' },
  province: { email: 'TPWPAFF@novascotia.ca', name: 'Nova Scotia Public Works' },
  transit: { email: 'halifax.transit@halifax.ca', name: 'Halifax Transit' },
};
