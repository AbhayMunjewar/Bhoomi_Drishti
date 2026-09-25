export interface DistrictKPI {
  totalAreaSqKm: number;
  agriculturalLandSqKm: number;
  urbanLandSqKm: number;
  activeProjects: number;
  landDisputes: number;
  climateRiskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  dataQualityScorePct: number;
  landUseChangePct: number;
}

export interface RiskFactorBreakdown {
  populationPressurePct: number;
  landUseChangePct: number;
  climateVulnerabilityPct: number;
  infrastructurePressurePct: number;
  dataConflictsPct: number;
}

export interface EvidenceCardData {
  id: string;
  findingTitle: string;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'VERY HIGH';
  confidencePct: number;
  keyFactors: string[];
  dataPeriod: string;
  sources: string[];
  methodology: string;
  district: string;
  isIllustrative?: boolean;
}

export interface DataConflictItem {
  id: string;
  title: string;
  district: string;
  taluka: string;
  surveyNo: string;
  sourceA: { name: string; value: string };
  sourceB: { name: string; value: string };
  discrepancy: string;
  status: 'Needs Verification' | 'Under Investigation' | 'Resolved';
  flaggedDate: string;
}

export interface AuditTrailEvent {
  id: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  location: string;
  timestamp: string;
  status: 'Success' | 'Flagged' | 'Denied';
}
