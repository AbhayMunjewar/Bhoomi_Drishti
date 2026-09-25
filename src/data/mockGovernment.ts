import { DistrictKPI, RiskFactorBreakdown, EvidenceCardData, DataConflictItem, AuditTrailEvent } from '../types/government';

export const MOCK_DISTRICT_KPI: DistrictKPI = {
  totalAreaSqKm: 12432,
  agriculturalLandSqKm: 8124,
  urbanLandSqKm: 2341,
  activeProjects: 28,
  landDisputes: 14,
  climateRiskLevel: 'High',
  dataQualityScorePct: 92,
  landUseChangePct: 6.2
};

export const MOCK_RISK_BREAKDOWN: RiskFactorBreakdown = {
  populationPressurePct: 82,
  landUseChangePct: 76,
  climateVulnerabilityPct: 68,
  infrastructurePressurePct: 71,
  dataConflictsPct: 55
};

export const MOCK_EVIDENCE_CARDS: EvidenceCardData[] = [
  {
    id: 'ev-01',
    findingTitle: 'Accelerated Peri-Urban Land Conversion in Floodplain Risk Zones',
    riskLevel: 'HIGH',
    confidencePct: 88,
    keyFactors: [
      'High seasonal rainfall anomaly (+25.7% IMD departure)',
      'Unplanned industrial warehousing expansion along Ulhas & Kanhan basins',
      'Loss of natural wetlands and natural drainage channels'
    ],
    dataPeriod: '2024–2026',
    sources: [
      'IMD District Operational Rainfall Data',
      'ISRO Bhuvan High-Res Satellite LULC Layers',
      'VJTI Urban Land Resilience Study (2025)'
    ],
    methodology: 'Multi-Criteria Geospatial Vulnerability Index (AHP + Hydro-flow Modeling)',
    district: 'Thane',
    isIllustrative: true
  },
  {
    id: 'ev-02',
    findingTitle: 'Low Elevation Estuarine Inundation Threat for Greenfield Housing',
    riskLevel: 'VERY HIGH',
    confidencePct: 92,
    keyFactors: [
      'Extreme seasonal rainfall (1250.4mm in monsoon period)',
      'Coastal lowland elevation (< 5.2m above sea level)',
      'Clayey coastal soil with poor natural drainage'
    ],
    dataPeriod: '2025–2026',
    sources: [
      'IMD District Operational Data',
      'Survey of India DEM Topographical Elevation',
      'CIDCO Coastal Zone Assessment'
    ],
    methodology: 'Coastal Inundation Risk & Hydro-Dynamic Elevation Model',
    district: 'Raigad',
    isIllustrative: true
  }
];

export const MOCK_DATA_CONFLICTS: DataConflictItem[] = [
  {
    id: 'cnf-101',
    title: 'Survey No. 142/3 Boundary Discrepancy',
    district: 'Nagpur',
    taluka: 'Hingna',
    surveyNo: '142/3',
    sourceA: { name: 'State Revenue Land Record (7/12)', value: '10.4 Hectares' },
    sourceB: { name: 'Bhuvan GIS High-Res Boundary Vector', value: '12.1 Hectares' },
    discrepancy: '1.7 Hectares Overlap with Industrial Corridor Buffer',
    status: 'Needs Verification',
    flaggedDate: '24 Sep 2026'
  },
  {
    id: 'cnf-102',
    title: 'Plot 88 Agricultural vs Built-up Classification Conflict',
    district: 'Thane',
    taluka: 'Bhiwandi',
    surveyNo: '88/B',
    sourceA: { name: 'District Zoning Master Plan', value: 'Agricultural Protection Zone' },
    sourceB: { name: 'Sentinel-2 LULC Remote Sensing', value: 'Commercial Logistics Built-up' },
    discrepancy: 'Unpermitted Land Use Conversion detected via Satellite',
    status: 'Under Investigation',
    flaggedDate: '22 Sep 2026'
  }
];

export const MOCK_AUDIT_TRAIL: AuditTrailEvent[] = [
  {
    id: 'aud-01',
    userName: 'District Officer (Nagpur)',
    userRole: 'District Officer',
    action: 'Viewed Risk Analysis & Evidence Card',
    resource: 'Nagpur East Sector Risk Zone',
    location: 'Nagpur, MH',
    timestamp: '25 Sep 2026, 11:42 AM',
    status: 'Success'
  },
  {
    id: 'aud-02',
    userName: 'Policy Maker (NITI Aayog)',
    userRole: 'Policy Maker',
    action: 'Executed Policy Simulator (Scenario B)',
    resource: 'Land Conversion Regulation Model',
    location: 'Maharashtra State Level',
    timestamp: '25 Sep 2026, 10:15 AM',
    status: 'Success'
  },
  {
    id: 'aud-03',
    userName: 'Dr. V. Joshi (VJTI)',
    userRole: 'Researcher',
    action: 'Submitted Research Dataset for Admin Approval',
    resource: 'Peri-Urban LULC Change Vector 2026',
    location: 'Mumbai, MH',
    timestamp: '24 Sep 2026, 04:30 PM',
    status: 'Success'
  }
];
