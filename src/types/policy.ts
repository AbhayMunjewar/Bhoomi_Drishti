export interface PolicySimulationParams {
  policyType: string;
  state: string;
  district: string;
  timeHorizonYears: number;
  urbanExpansionPct: number;
  infrastructureInvestmentCr: number;
  conservationFocusPct: number;
}

export interface ScenarioMetrics {
  scenarioId: 'Scenario A' | 'Scenario B' | 'Scenario C';
  scenarioName: string;
  description: string;
  landAffectedHectares: number;
  populationAffectedLakhs: number;
  environmentalRiskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  infrastructurePressureScore: number;
  overallRiskScorePct: number;
  keyDrivers: string[];
}

export interface PolicyDocument {
  id: string;
  title: string;
  ministry: string;
  year: number;
  category: string;
  summary: string;
  downloadUrl?: string;
}
