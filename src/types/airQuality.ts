
export type AqiCategory = 
  | "Good" 
  | "Satisfactory" 
  | "Moderate" 
  | "Poor" 
  | "Very Poor" 
  | "Severe" 
  | "Unknown";

export interface AirQualityData {
  "PM2.5"?: number;
  "PM10"?: number;
  "NO"?: number;
  "NO2"?: number;
  "SO2"?: number;
  "Ozone"?: number;
  "CO"?: number;
  "Aqi": AqiCategory;
}

export interface HistoricalDataPoint {
  date: string;
  aqiCategory: AqiCategory;
  pm25?: number;
  pm10?: number;
  no2?: number;
  so2?: number;
  ozone?: number;
}

export interface LocationMarker {
  lat: number;
  lon: number;
}

export interface PollutantInfo {
  name: string;
  fullName: string;
  description: string;
  sources: string[];
  healthEffects: string[];
  threshold: {
    good: number;
    satisfactory: number;
    moderate: number;
    poor: number;
    veryPoor: number;
    severe: number;
  };
  unit: string;
}
