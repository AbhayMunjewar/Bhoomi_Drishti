import { ResearchPaper, ResearchDataset, ResearchProject } from '../types/research';

export const MOCK_RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-01',
    title: 'Geospatial Evaluation of Peri-Urban Land Use Conversion and Flood Vulnerability in Maharashtra Coastal Belts',
    authors: ['Dr. Vikramaditya Joshi', 'Prof. Smita Kulkarni', 'Er. Rahul Deshmukh'],
    year: 2025,
    publisherOrSource: 'Journal of Indian Land Governance & Geoinformatics',
    doi: '10.1016/j.landuse.2025.109281',
    topics: ['Land Use Change', 'Climate & Flood Resilience', 'GIS Modeling', 'Zoning Policy'],
    geographicRelevance: {
      state: 'Maharashtra',
      districts: ['Raigad', 'Thane', 'Mumbai Suburban'],
      lat: 18.9894,
      lng: 73.1175
    },
    abstract: 'This research evaluates the rapid conversion of agricultural and wetland land parcels into industrial logistics parks along coastal Maharashtra. Combining Sentinel-2 10m multispectral imagery with IMD operational rainfall departure datasets, the study highlights how low-elevation developments (< 10m ASL) face a 3.4x higher inundation risk without mandatory 50m drainage buffer zones.',
    keyFindings: [
      '31.6% excess monsoon rainfall in Raigad district exacerbated estuarine drainage bottlenecks.',
      'Uncontrolled land filing increased surface run-off velocity by 42%.',
      'Recommended mandatory statutory buffer zones before granting agricultural land conversion clearances.'
    ],
    methodology: 'Integrated Remote Sensing (NDVI/MNDWI) + Hydrological HEC-RAS Flow Simulation + GIS Spatial Overlay',
    datasetName: 'Maharashtra Coastal LULC & Rainfall Vulnerability Vector (2024-2026)',
    policyRelevance: 'Directly applicable to State Revenue Department land conversion guidelines and District Master Plans.',
    isPublic: true,
    status: 'Published',
    relevanceScore: 96
  },
  {
    id: 'paper-02',
    title: 'Challenges and Solutions in Digitizing Land Records (7/12) and Harmonizing cadastral Vectors with Satellite Remote Sensing in India',
    authors: ['Prof. R. V. Kulkarni', 'Dr. S. Patil', 'Ankita Verma'],
    year: 2024,
    publisherOrSource: 'National Institute of Urban Affairs & Land Records Review',
    doi: '10.1007/s12145-024-00812-x',
    topics: ['Land Record Digitization', 'Cadastral GIS', 'Boundary Conflict Resolution'],
    geographicRelevance: {
      state: 'Maharashtra',
      districts: ['Nagpur', 'Pune', 'Nashik'],
      lat: 21.1458,
      lng: 79.0882
    },
    abstract: 'Digitization of paper-based revenue records (RoR) often reveals spatial mismatches between text land titles and actual physical plot boundaries on high-resolution satellite imagery. This paper proposes an automated AI vector alignment framework using MapLibre/PostGIS and machine learning edge detection.',
    keyFindings: [
      'Analyzed 12,000 land parcels across 4 districts.',
      'Identified average boundary variance of 1.4 to 2.2 meters due to historical survey datum shifts.',
      'Demonstrated 89% reduction in manual land dispute verification time using AI conflict detection.'
    ],
    methodology: 'High-Res WorldView-3 Feature Extraction + PostGIS Topological Verification',
    datasetName: 'Cadastral Boundary Mismatch Benchmark Dataset',
    policyRelevance: 'Essential reference for DILRMP (Digital India Land Records Modernization Programme).',
    isPublic: true,
    status: 'Published',
    relevanceScore: 92
  }
];

export const MOCK_RESEARCH_DATASETS: ResearchDataset[] = [
  {
    id: 'ds-01',
    title: 'Maharashtra District Land Use & Climate Risk Vector Layer (2026)',
    organization: 'VJTI Geoinformatics Lab',
    format: 'GeoJSON',
    recordsCount: 36,
    lastUpdated: '25 Sep 2026',
    isPublic: true,
    topic: 'Climate & GIS'
  },
  {
    id: 'ds-02',
    title: 'Peri-Urban Industrial Land Parcel Boundary Disputes Sample Set',
    organization: 'IIT Bombay Land Research Cell',
    format: 'CSV',
    recordsCount: 1240,
    lastUpdated: '20 Sep 2026',
    isPublic: true,
    topic: 'Land Disputes'
  }
];

export const MOCK_RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'proj-res-01',
    title: 'Evidence-Based Land Governance Decision Support System for Peri-Urban Corridors',
    leadInstitution: 'VJTI Mumbai',
    principalInvestigator: 'Dr. Vikramaditya Joshi',
    budget: '₹1.2 Cr',
    status: 'Active',
    district: 'Thane & Raigad',
    researchersCount: 6
  },
  {
    id: 'proj-res-02',
    title: 'AI-Powered Satellite Cadastral Conflict Detection & Resolution Engine',
    leadInstitution: 'IIT Bombay',
    principalInvestigator: 'Prof. R. V. Kulkarni',
    budget: '₹2.4 Cr',
    status: 'Active',
    district: 'Nagpur & Pune',
    researchersCount: 8
  }
];
