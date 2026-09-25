export interface InnovationChallengeItem {
  id: string;
  title: string;
  department: string;
  theme: string;
  geography: string;
  problemStatement: string;
  expectedOutcome: string;
  availableData: string;
  eligibility: string;
  submissionDeadline: string;
  evaluationCriteria: string;
  status: 'Open' | 'Draft' | 'Under Evaluation' | 'Selected' | 'Pilot' | 'Completed' | 'Closed';
  submissionsCount: number;
}

export interface HackathonItem {
  id: string;
  title: string;
  organizer: string;
  theme: string;
  dates: string;
  eligibility: string;
  prizePool: string;
  problemStatementsCount: number;
  teamsRegistered: number;
  status: 'Registration Open' | 'Ongoing' | 'Evaluation' | 'Completed';
  description: string;
}

export interface ResearchGrantItem {
  id: string;
  title: string;
  fundingAgency: string;
  researchArea: string;
  maxFundingAmount: string;
  durationMonths: number;
  applicationDeadline: string;
  eligibility: string;
  applicationsCount: number;
  status: 'Applications Open' | 'Under Review' | 'Grants Awarded' | 'Closed';
}

export interface PilotProjectItem {
  id: string;
  innovationTitle: string;
  location: string;
  district: string;
  durationMonths: number;
  startDate: string;
  objective: string;
  leadInstitution: string;
  supportingAgency: string;
  status: 'Proposed' | 'Approved' | 'Active' | 'Evaluation' | 'Completed' | 'Scaled';
  predictedMetrics: {
    detectionAccuracyPct: number;
    falsePositivePct: number;
    processingTimeDays: number;
    costInLakhs: number;
  };
  actualMetrics?: {
    detectionAccuracyPct: number;
    falsePositivePct: number;
    processingTimeDays: number;
    costInLakhs: number;
  };
  evaluationSummary?: string;
  recommendations?: string;
}

export interface KnowledgeCompetitionItem {
  id: string;
  title: string;
  category: 'Best Land Governance Research' | 'Best GIS Innovation' | 'Best Climate Resilience Solution' | 'Best Digital Land Governance Idea';
  organizer: string;
  deadline: string;
  submissionsCount: number;
  status: 'Open' | 'Jury Review' | 'Winners Announced';
  winningEntry?: string;
}

export interface InnovationDetailRecord {
  id: string;
  title: string;
  problem: string;
  proposedSolution: string;
  researchBasis: string;
  datasetUsed: string;
  technology: string;
  geography: string;
  team: string;
  institution: string;
  expectedImpact: string;
  pilotStatus: string;
  evidenceLink: string;
  evaluationOutcome: string;
  relatedResearchPaper: string;
  relatedPolicyScenario: string;
  relatedGISLayer: string;
}

export interface ResearchGapItem {
  id: string;
  topic: string;
  gapType: 'Geographic Gap' | 'Dataset Gap' | 'Methodological Gap' | 'Policy Evidence Gap' | 'Under-Researched Topic';
  districtOrState: string;
  description: string;
  aiSuggestedKeywords: string[];
  suggestedMethodology: string;
  relevanceScore: number;
}

export interface HigherAuthorityDataIssue {
  id: string;
  issueTitle: string;
  datasetOrLayer: string;
  district: string;
  severity: 'Critical' | 'High' | 'Medium';
  reportedBy: string;
  reportedDate: string;
  status: 'Pending Authority Review' | 'Under Review' | 'Authorized Replacement Approved' | 'Dismissed';
  evidenceDetails: string;
}

// -------------------------------------------------------------
// MOCK DATA PAYLOADS
// -------------------------------------------------------------

export const MOCK_INNOVATION_CHALLENGES: InnovationChallengeItem[] = [
  {
    id: 'chl-001',
    title: 'AI-Based Detection of Unauthorized Land-Use Change in Peri-Urban Corridors',
    department: 'Department of Revenue & Land Records, Govt. of MH',
    theme: 'AI & Remote Sensing Governance',
    geography: 'Nagpur & Raigad Industrial Belts',
    problemStatement: 'Rapid conversion of prime agricultural land into unauthorized industrial storage yards without non-agricultural (NA) clearance.',
    expectedOutcome: 'Automated satellite vector change detection model running on Sentinel-2 10m imagery with >85% accuracy.',
    availableData: 'Sentinel-2 LULC Grids, District Zoning Master Plan Vectors, 7/12 RoR Cadastral Boundaries.',
    eligibility: 'Academic Institutions, Tech Startups, Independent GIS Researchers.',
    submissionDeadline: '15 Nov 2026',
    evaluationCriteria: 'Detection Accuracy (40%), False Positive Reduction (30%), Processing Speed (20%), Officer Usability (10%).',
    status: 'Open',
    submissionsCount: 14
  },
  {
    id: 'chl-002',
    title: 'Estuarine Coastal Regulation Zone (CRZ-I) Mangrove Buffer Mapping',
    department: 'Maharashtra Coastal Zone Management Authority (MCZMA)',
    theme: 'Climate Resilience & Coastal Land Governance',
    geography: 'Thane & Raigad Estuarine Coastlines',
    problemStatement: 'Encroachment into 50m eco-sensitive mangrove buffers due to conflicting cadastral survey boundary maps.',
    expectedOutcome: 'High-precision spatial boundary model overlaying mangrove density maps with revenue plot titles.',
    availableData: 'CWC Flood Hazard Polygons, CRZ Notification Maps, High-Res WorldView-3 Satellite Images.',
    eligibility: 'GIS Experts, Coastal Engineering Research Labs, Environmental Think Tanks.',
    submissionDeadline: '30 Oct 2026',
    evaluationCriteria: 'Spatial Precision (50%), Legal Boundary Alignment (30%), Reproducibility (20%).',
    status: 'Under Evaluation',
    submissionsCount: 8
  }
];

export const MOCK_HACKATHONS: HackathonItem[] = [
  {
    id: 'hack-2026-01',
    title: 'National Land Governance AI & GIS Hackathon 2026',
    organizer: 'Ministry of Rural Development (DoLR) & NITI Aayog',
    theme: 'AI, Geospatial Technologies & Evidence-Based Policy Innovation',
    dates: '10 Nov - 12 Nov 2026',
    eligibility: 'Open to Researchers, University Teams, GIS Engineers & Startups',
    prizePool: '₹ 15,00,000 + Government Innovation Incubation Support',
    problemStatementsCount: 4,
    teamsRegistered: 128,
    status: 'Registration Open',
    description: 'Solve critical national land governance challenges using satellite imagery, PostGIS vector analytics, and machine learning models.'
  }
];

export const MOCK_RESEARCH_GRANTS: ResearchGrantItem[] = [
  {
    id: 'grt-101',
    title: 'Applied Land Governance Research Grant for Peri-Urban Agriculture Resilience',
    fundingAgency: 'Department of Land Resources (DoLR), MoRD',
    researchArea: 'Urban-Rural Land Transitions & Climate Change',
    maxFundingAmount: '₹ 25,00,000',
    durationMonths: 18,
    applicationDeadline: '31 Dec 2026',
    eligibility: 'Recognized Universities, IITs, NITs, and Approved Policy Research Institutes',
    applicationsCount: 19,
    status: 'Applications Open'
  }
];

export const MOCK_PILOT_PROJECTS: PilotProjectItem[] = [
  {
    id: 'plt-501',
    innovationTitle: 'AI-Based Detection of Unauthorized Land-Use Change in Nagpur Sector',
    location: 'Nagpur Rural & Industrial Belt',
    district: 'Nagpur',
    durationMonths: 6,
    startDate: '01 Jan 2026',
    objective: 'Evaluate whether automated AI satellite change detection can identify non-agricultural encroachments faster than manual field inspection.',
    leadInstitution: 'Veermata Jijabai Technological Institute (VJTI Mumbai)',
    supportingAgency: 'District Revenue Collectorate, Nagpur',
    status: 'Active',
    predictedMetrics: {
      detectionAccuracyPct: 90.0,
      falsePositivePct: 5.0,
      processingTimeDays: 2.0,
      costInLakhs: 4.5
    },
    actualMetrics: {
      detectionAccuracyPct: 86.4,
      falsePositivePct: 7.2,
      processingTimeDays: 2.5,
      costInLakhs: 4.8
    },
    evaluationSummary: 'The AI model successfully identified 14 unauthorized warehouse structures 18 days faster than traditional physical inspection. False positives occurred primarily over dry seasonal riverbeds.',
    recommendations: 'Scale pilot to 4 adjacent districts after integrating seasonal NDVI water-body masking filters.'
  }
];

export const MOCK_KNOWLEDGE_COMPETITIONS: KnowledgeCompetitionItem[] = [
  {
    id: 'comp-01',
    title: 'National Competition for Best GIS Land Governance Innovation 2026',
    category: 'Best GIS Innovation',
    organizer: 'National Remote Sensing Centre (NRSC / ISRO)',
    deadline: '20 Nov 2026',
    submissionsCount: 32,
    status: 'Open'
  }
];

export const MOCK_INNOVATION_DETAIL: InnovationDetailRecord = {
  id: 'inn-detail-01',
  title: 'Automated Satellite Vector Change Detection for Peri-Urban Land Governance',
  problem: 'Uncontrolled industrial encroachment on fertile agricultural land without statutory non-agricultural (NA) land conversion clearance.',
  proposedSolution: 'Deep learning U-Net model trained on Sentinel-2 optical imagery to generate daily land conversion bounding polygons.',
  researchBasis: 'Joshi et al. (2025), "Geospatial Evaluation of Peri-Urban Land Use Conversion in Konkan Corridor".',
  datasetUsed: 'Maharashtra District Land Use & LULC Acreage Vector (v2.4)',
  technology: 'Python, PyTorch, GDAL, PostGIS, MapLibre GL JS',
  geography: 'Nagpur & Raigad Industrial Belts',
  team: 'Geoinformatics Research Group',
  institution: 'VJTI Mumbai & IIT Bombay GIS Cell',
  expectedImpact: '80% reduction in unauthorized land conversion detection latency.',
  pilotStatus: 'Active Pilot (plt-501 in Nagpur District)',
  evidenceLink: '/government/research-evidence',
  evaluationOutcome: 'Predicted Accuracy: 90% | Actual Pilot Accuracy: 86.4%',
  relatedResearchPaper: 'Geospatial Evaluation of Peri-Urban Land Use Conversion',
  relatedPolicyScenario: 'Nagpur Statutory 50m Drainage Buffer Simulation',
  relatedGISLayer: 'LULC Land Use & Land Cover Grid (10m Resolution)'
};

export const MOCK_RESEARCH_GAPS: ResearchGapItem[] = [
  {
    id: 'gap-001',
    topic: 'Impact of Peri-Urban Solar Park Land Acquisition on Agricultural Laborers',
    gapType: 'Under-Researched Topic',
    districtOrState: 'Marathwada Region (Solapur & Latur)',
    description: 'Existing research focuses heavily on industrial corridors; limited socio-economic evidence exists regarding solar farm land acquisitions.',
    aiSuggestedKeywords: ['Solar Park Acquisition', 'Agricultural Labor Displacement', 'Marathwada Land Conversion'],
    suggestedMethodology: 'Combine satellite LULC time-series with district household employment surveys.',
    relevanceScore: 94
  },
  {
    id: 'gap-002',
    topic: 'Estuarine Coastal Boundary Discrepancy Resolution in High-Tide Zones',
    gapType: 'Methodological Gap',
    districtOrState: 'Raigad & Thane Coastal Fringe',
    description: 'High variance between paper survey titles and high-tide line satellite imagery during monsoon periods.',
    aiSuggestedKeywords: ['CRZ-I Boundary Variance', 'High Tide Line Satellite Vector', 'Cadastral Overlay'],
    suggestedMethodology: 'Multi-temporal SAR Radar imagery processing to eliminate seasonal cloud interference.',
    relevanceScore: 89
  }
];

export const MOCK_AUTHORITY_DATA_ISSUES: HigherAuthorityDataIssue[] = [
  {
    id: 'iss-901',
    issueTitle: 'Stale Rainfall Vector Coordinates in Solapur District',
    datasetOrLayer: 'IMD Operational District Monsoon Rainfall Matrix',
    district: 'Solapur',
    severity: 'High',
    reportedBy: 'Shri Manoj Deshmukh (Data & GIS Officer)',
    reportedDate: '25 Sep 2026',
    status: 'Pending Authority Review',
    evidenceDetails: 'Direct API whitelist pending authorization. Data Officer submitted verified operational CSV snapshot for authorized replacement.'
  },
  {
    id: 'iss-902',
    issueTitle: 'Cadastral Survey Parcel #142/3 Boundary Discrepancy Flag',
    datasetOrLayer: 'State Cadastral Revenue Polygon Vector vs Satellite',
    district: 'Nagpur',
    severity: 'Critical',
    reportedBy: 'Priya Sharma (Data & GIS Officer)',
    reportedDate: '24 Sep 2026',
    status: 'Under Review',
    evidenceDetails: '1.7 ha area variance flagged between 7/12 RoR text title and satellite vector boundary. Escalated for District Collectorate review.'
  }
];

export const MOCK_INNOVATION_METRICS = {
  activeChallenges: 6,
  openHackathons: 2,
  activeGrants: 8,
  totalFundingPool: '₹4.5 Crore',
  activePilots: 5,
  successfulPilots: 3,
  participatingInstitutions: 24
};

export interface PSChecklistItem {
  id: number;
  requirement: string;
  status: 'Implemented' | 'Prototype' | 'Planned Production Integration';
  route: string;
  notes: string;
}

export const MOCK_PS_CHECKLIST: PSChecklistItem[] = [
  { id: 1, requirement: 'Centralized research repository', status: 'Implemented', route: '/research/papers', notes: 'Indexed academic papers, metadata, search & PDF previews.' },
  { id: 2, requirement: 'Policy documents', status: 'Implemented', route: '/government/research-evidence', notes: 'Policy briefs, government acts, gazette notifications linked to evidence.' },
  { id: 3, requirement: 'Datasets', status: 'Implemented', route: '/data/datasets', notes: 'Cataloged CSV, GeoJSON, PostGIS tables with provenance metadata.' },
  { id: 4, requirement: 'Legal documents', status: 'Implemented', route: '/research/papers', notes: 'Land Acquisition Act 2013, Forest Rights Act, CRZ Notifications.' },
  { id: 5, requirement: 'Case studies', status: 'Implemented', route: '/public/reports', notes: 'Nagpur solar park, Solapur drought resilience, Konkan mangrove protection.' },
  { id: 6, requirement: 'AI search', status: 'Implemented', route: '/research/search', notes: 'Semantic vector search & keyword relevance scoring for land research.' },
  { id: 7, requirement: 'Recommendation engine', status: 'Implemented', route: '/research', notes: 'Related papers, datasets, and policy scenarios matching user profile.' },
  { id: 8, requirement: 'Collaborative workspace', status: 'Implemented', route: '/research/workspace', notes: 'Shared notes, dataset attachments, task assignments, export reports.' },
  { id: 9, requirement: 'GIS visualization', status: 'Implemented', route: '/data/gis-map', notes: 'MapLibre GL JS vector maps, cadastral overlays, satellite basemaps.' },
  { id: 10, requirement: 'Advanced analytics', status: 'Implemented', route: '/government/risk', notes: 'Climate vulnerability index, LULC acreage distribution, risk heatmaps.' },
  { id: 11, requirement: 'Decision support', status: 'Implemented', route: '/government/district', notes: 'Candidate site scoring, risk matrices, decision-support reports.' },
  { id: 12, requirement: 'Policy simulation', status: 'Implemented', route: '/government/policy/simulator', notes: 'Interactive scenario modeling, parameter sliders, impact estimation.' },
  { id: 13, requirement: 'Satellite/remote sensing integration architecture', status: 'Prototype', route: '/data/pipeline', notes: 'Sentinel-2 LULC raster & vector overlays via prepared prototype data.' },
  { id: 14, requirement: 'Land records integration architecture', status: 'Prototype', route: '/data/sources', notes: 'Simulated 7/12 RoR cadastral vector sources via CSV prototype pipeline.' },
  { id: 15, requirement: 'Socioeconomic datasets', status: 'Implemented', route: '/public/statistics', notes: 'Census data, agricultural labor statistics, district GDP indicators.' },
  { id: 16, requirement: 'AI-assisted research', status: 'Implemented', route: '/research/search', notes: 'Natural language summaries, research synthesis & recommendation.' },
  { id: 17, requirement: 'Trend analysis', status: 'Implemented', route: '/public/land-use', notes: 'Multi-year LULC transition trends, urban expansion velocity charts.' },
  { id: 18, requirement: 'Literature synthesis', status: 'Implemented', route: '/research/search', notes: 'Synthesized summaries across multiple indexed land governance papers.' },
  { id: 19, requirement: 'Predictive/scenario analysis', status: 'Implemented', route: '/government/policy/scenario-comparison', notes: 'Side-by-side trade-off comparison of policy interventions.' },
  { id: 20, requirement: 'Innovation portal', status: 'Implemented', route: '/innovation', notes: 'Dedicated hub for land governance challenges, hackathons, grants & pilots.' },
  { id: 21, requirement: 'Hackathons', status: 'Implemented', route: '/innovation/hackathons', notes: 'National Land Governance AI Hackathon registration & tracks.' },
  { id: 22, requirement: 'Research grants', status: 'Implemented', route: '/innovation/grants', notes: 'DoLR research grant opportunities, eligibility & submission workflow.' },
  { id: 23, requirement: 'Pilot projects', status: 'Implemented', route: '/innovation/pilots', notes: 'Controlled real-world field pilots (Nagpur AI change detection).' },
  { id: 24, requirement: 'Knowledge competitions', status: 'Implemented', route: '/innovation/competitions', notes: 'Best GIS Innovation & Land Governance Idea competitions with jury review.' },
  { id: 25, requirement: 'Research dashboards', status: 'Implemented', route: '/research/dashboard', notes: 'Researcher KPI overview, active projects, publication activity.' },
  { id: 26, requirement: 'Policy performance indicators', status: 'Implemented', route: '/government/district', notes: 'Land risk score, climate adaptation progress, zoning compliance.' },
  { id: 27, requirement: 'Land-use trends', status: 'Implemented', route: '/public/land-use', notes: 'Agricultural conversion trends, forest cover change matrices.' },
  { id: 28, requirement: 'Climate resilience metrics', status: 'Implemented', route: '/public/climate', notes: 'IMD rainfall anomaly, flood hazard risk, drought vulnerability.' },
  { id: 29, requirement: 'Land dispute statistics architecture', status: 'Prototype', route: '/government/district', notes: 'District dispute resolution metrics & boundary discrepancy tracking.' },
  { id: 30, requirement: 'Project implementation outcomes', status: 'Implemented', route: '/authority/monitoring', notes: 'Predicted vs actual outcome comparisons & research feedback loop.' },
  { id: 31, requirement: 'Geospatial insights', status: 'Implemented', route: '/data/spatial-analysis', notes: 'Spatial buffer analysis, land parcel discrepancy alerts.' },
  { id: 32, requirement: 'RBAC', status: 'Implemented', route: '/admin/users', notes: '6 core roles: Admin, Higher Authority, Data Officer, Researcher, Policy Officer, Institution.' },
  { id: 33, requirement: 'Government/API integration architecture', status: 'Prototype', route: '/data/pipeline', notes: 'Designed for production API gateways; prototype uses prepared CSV feeds.' }
];

