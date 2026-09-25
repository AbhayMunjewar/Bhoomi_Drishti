export interface MapLayerConfig {
  id: string;
  name: string;
  category: 'Boundary' | 'LandUse' | 'Projects' | 'Climate' | 'Research' | 'Scenario';
  visible: boolean;
  color: string;
}

export interface RegionFeatureProperties {
  id: string;
  name: string;
  district: string;
  state: string;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'VERY HIGH';
  riskScore: number;
  landUse: string;
  areaHa: number;
  activeProjects: number;
  researchCount: number;
  dataQualityScore: number;
  climateRainfallMm?: number;
  rainfallDeparturePct?: number;
}
