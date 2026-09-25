import { ScenarioMetrics, PolicyDocument } from '../types/policy';

export const MOCK_SCENARIOS: Record<string, ScenarioMetrics> = {
  'Scenario A': {
    scenarioId: 'Scenario A',
    scenarioName: 'Current Policy Baseline',
    description: 'Unrestricted peri-urban land conversion with standard 15m drainage setbacks.',
    landAffectedHectares: 2341,
    populationAffectedLakhs: 1.2,
    environmentalRiskLevel: 'High',
    infrastructurePressureScore: 78,
    overallRiskScorePct: 78,
    keyDrivers: [
      'Rapid agricultural-to-industrial land conversion',
      'Encroachment into natural low-elevation drainage basins',
      'High seasonal rainfall vulnerability (+25.7% departure)'
    ]
  },
  'Scenario B': {
    scenarioId: 'Scenario B',
    scenarioName: 'Proposed Managed Growth Policy',
    description: 'Mandatory 50m hydrological buffer zone along water bodies & controlled zoning.',
    landAffectedHectares: 1420,
    populationAffectedLakhs: 0.7,
    environmentalRiskLevel: 'Moderate',
    infrastructurePressureScore: 48,
    overallRiskScorePct: 48,
    keyDrivers: [
      '50m eco-buffer enforcement reduces flood vulnerability by 38%',
      'Rainwater harvesting infrastructure mandated for logiparks',
      'Controlled land-use conversion density caps'
    ]
  },
  'Scenario C': {
    scenarioId: 'Scenario C',
    scenarioName: 'Strict Conservation & Climate Adaptation',
    description: 'Complete ban on land conversion in floodplains (< 15m ASL) & maximum green corridor mandate.',
    landAffectedHectares: 680,
    populationAffectedLakhs: 0.3,
    environmentalRiskLevel: 'Low',
    infrastructurePressureScore: 24,
    overallRiskScorePct: 24,
    keyDrivers: [
      'Zero development permitted in high-risk estuarine zones',
      'High agricultural preservation (88% retained)',
      'Substantial reduction in infrastructure flood damage risk'
    ]
  }
};

export const MOCK_POLICY_DOCUMENTS: PolicyDocument[] = [
  {
    id: 'pol-doc-01',
    title: 'Model Policy Framework for Evidence-Based Peri-Urban Land Governance in India',
    ministry: 'NITI Aayog & Ministry of Housing and Urban Affairs',
    year: 2025,
    category: 'National Policy Guideline',
    summary: 'Guidelines for integrating high-resolution GIS satellite data with district land revenue records (7/12) to assess climate risk before approving agricultural-to-commercial land use conversion.'
  },
  {
    id: 'pol-doc-02',
    title: 'National Land Record Modernization & Geospatial Alignment Guidelines (DILRMP 2.0)',
    ministry: 'Department of Land Resources (DoLR), Govt. of India',
    year: 2024,
    category: 'Statutory Standard',
    summary: 'Technical framework for resolving cadastral vector mismatches between physical revenue surveys and remote sensing satellite vector layers.'
  }
];
