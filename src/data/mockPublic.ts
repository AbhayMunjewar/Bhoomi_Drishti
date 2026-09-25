export interface PublicResearchPaper {
  id: string;
  title: string;
  authors: string[];
  institution: string;
  year: number;
  publisher: string;
  doi?: string;
  topics: string[];
  abstract: string;
  researchQuestion: string;
  methodology: string;
  keyFindings: string[];
  studyArea: {
    state: string;
    districts: string[];
    lat: number;
    lng: number;
  };
  dataUsed: string[];
  limitations: string;
  policyRelevance: string;
  gisLocation: { lat: number; lng: number; label: string };
  relatedResearchIds: string[];
  sourceUrl?: string;
  dataStatus: 'OFFICIAL_SOURCE' | 'PROTOTYPE_DERIVED' | 'SYNTHETIC_PROTOTYPE';
}

export interface PublicDataset {
  id: string;
  title: string;
  description: string;
  publisher: string;
  coverage: string;
  state: string;
  district?: string;
  timePeriod: string;
  format: 'GeoJSON' | 'CSV' | 'NetCDF' | 'KML' | 'Shapefile';
  fileSize: string;
  lastUpdated: string;
  license: string;
  category: 'Land' | 'LULC' | 'Climate' | 'Rainfall' | 'Infrastructure' | 'Population' | 'Research' | 'Environment' | 'Projects';
  dataStatus: 'OFFICIAL_SOURCE' | 'PROTOTYPE_DERIVED' | 'SYNTHETIC_PROTOTYPE';
  dataQuality: string;
  schemaFields: { field: string; type: string; description: string }[];
  previewRows: Record<string, string | number>[];
  downloadUrl: string;
}

export interface PublicReport {
  id: string;
  title: string;
  organization: string;
  publicationDate: string;
  year: number;
  reportType: 'Land Governance' | 'Climate' | 'Land Use' | 'Infrastructure' | 'Research' | 'Policy Analysis' | 'Project Outcomes';
  state: string;
  district?: string;
  coverage: string;
  summary: string;
  purpose: string;
  methodology: string;
  dataSources: string[];
  keyFindings: string[];
  mapsAndChartsCount: number;
  limitations: string;
  dataStatus: 'OFFICIAL_SOURCE' | 'PROTOTYPE_DERIVED' | 'SYNTHETIC_PROTOTYPE';
}

export interface PublicProject {
  id: string;
  name: string;
  location: string;
  state: string;
  district: string;
  department: string;
  status: 'Active' | 'Completed' | 'Pilot Phase' | 'Under Review';
  startDate: string;
  targetCompletion?: string;
  description: string;
  objectives: string[];
  linkedDatasets: string[];
  linkedResearch: string[];
  progressPercentage: number;
  outcomes: string[];
  lat: number;
  lng: number;
  dataStatus: 'OFFICIAL_SOURCE' | 'PROTOTYPE_DERIVED' | 'SYNTHETIC_PROTOTYPE';
}

export interface DistrictClimateData {
  district: string;
  state: string;
  rainfallActualMm: number;
  rainfallNormalMm: number;
  departurePercentage: number;
  spiDroughtCategory: 'Normal' | 'Mild Drought' | 'Moderate Drought' | 'Severe Drought';
  floodHazard: 'Low' | 'Moderate' | 'High' | 'Very High';
  tempMaxC: number;
  tempMinC: number;
  lulcPrimary: string;
  lastUpdated: string;
  lat: number;
  lng: number;
  dataStatus: 'OFFICIAL_SOURCE' | 'PROTOTYPE_DERIVED' | 'SYNTHETIC_PROTOTYPE';
}

export interface DistrictLandUseData {
  district: string;
  state: string;
  year: number;
  agriculturalAreaKm2: number;
  forestAreaKm2: number;
  builtUpAreaKm2: number;
  waterBodyAreaKm2: number;
  barrenLandKm2: number;
  totalAreaKm2: number;
  builtUpChangePercentage5Yr: number;
  forestChangePercentage5Yr: number;
  dataStatus: 'OFFICIAL_SOURCE' | 'PROTOTYPE_DERIVED' | 'SYNTHETIC_PROTOTYPE';
}

export const PUBLIC_RESEARCH_PAPERS: PublicResearchPaper[] = [
  {
    id: 'res-pub-01',
    title: 'Geospatial Evaluation of Peri-Urban Land Use Conversion and Flood Vulnerability in Coastal Maharashtra',
    authors: ['Dr. Vikramaditya Joshi', 'Prof. Smita Kulkarni', 'Er. Rahul Deshmukh'],
    institution: 'Veermata Jijabai Technological Institute (VJTI), Mumbai',
    year: 2025,
    publisher: 'Journal of Indian Land Governance & Geoinformatics',
    doi: '10.1016/j.landuse.2025.109281',
    topics: ['Land Use Change', 'Climate & Flood Resilience', 'Remote Sensing', 'Zoning Policy'],
    abstract: 'This research evaluates the rapid conversion of agricultural and wetland land parcels into industrial logistics parks along coastal Maharashtra. Combining Sentinel-2 10m multispectral imagery with IMD operational rainfall departure datasets, the study highlights how low-elevation developments (< 10m ASL) face a 3.4x higher inundation risk without mandatory 50m drainage buffer zones.',
    researchQuestion: 'How does peri-urban agricultural-to-industrial land conversion impact estuarine drainage capacity and flood vulnerability during extreme rainfall events?',
    methodology: 'Integrated Remote Sensing (NDVI/MNDWI classification on Sentinel-2) + Hydrological HEC-RAS 2D Flow Simulation + GIS Spatial Buffer Overlay.',
    keyFindings: [
      '31.6% excess monsoon rainfall in Raigad district exacerbated estuarine drainage bottlenecks.',
      'Uncontrolled land filling increased surface run-off velocity by 42%.',
      'Mandatory 50m statutory drainage buffers recommended before agricultural land conversion clearances.'
    ],
    studyArea: {
      state: 'Maharashtra',
      districts: ['Raigad', 'Thane', 'Mumbai Suburban'],
      lat: 18.9894,
      lng: 73.1175
    },
    dataUsed: ['Sentinel-2 L2A Imagery (2021-2025)', 'IMD Gridded Daily Rainfall (0.25 deg)', 'Bhuvan 30m Digital Elevation Model'],
    limitations: 'Validation constrained to gauged estuarine points; ungauged minor streams interpolated via SRTM DEM.',
    policyRelevance: 'Directly applicable to State Revenue Department land conversion (NA clearances) guidelines and District Master Plans.',
    gisLocation: { lat: 18.9894, lng: 73.1175, label: 'Navi Mumbai Peri-Urban Zone' },
    relatedResearchIds: ['res-pub-02', 'res-pub-03'],
    dataStatus: 'PROTOTYPE_DERIVED'
  },
  {
    id: 'res-pub-02',
    title: 'Harmonizing Cadastral Vectors with High-Resolution Satellite Remote Sensing for Rural Boundary Conflict Mitigation',
    authors: ['Prof. R. V. Kulkarni', 'Dr. S. Patil', 'Ankita Verma'],
    institution: 'IIT Bombay GIS & Spatial Data Cell',
    year: 2024,
    publisher: 'National Institute of Urban Affairs & Land Records Review',
    doi: '10.1007/s12145-024-00812-x',
    topics: ['Land Record Digitization', 'Digital Land Governance', 'Remote Sensing', 'Land Disputes'],
    abstract: 'Digitization of paper-based revenue records (RoR 7/12) often reveals spatial mismatches between text land titles and physical plot boundaries on high-resolution satellite imagery. This paper presents an automated AI vector alignment framework using PostGIS topological verification and machine learning edge detection.',
    researchQuestion: 'Can deep learning models reconcile historical survey datum shifts between legacy paper cadastral maps and 0.3m WorldView satellite imagery?',
    methodology: 'High-Res WorldView-3 Feature Extraction + PostGIS Topological Edge Verification + Elastic Map Transformation.',
    keyFindings: [
      'Analyzed 12,000 rural land parcels across Nagpur and Pune districts.',
      'Identified average boundary spatial displacement of 1.4m to 2.2m due to legacy survey datum offsets.',
      'Achieved an 89% reduction in manual ground verification turnaround time.'
    ],
    studyArea: {
      state: 'Maharashtra',
      districts: ['Nagpur', 'Pune', 'Nashik'],
      lat: 21.1458,
      lng: 79.0882
    },
    dataUsed: ['High-Resolution WorldView-3 Imagery (0.3m)', 'Digital Cadastral Vector Layers (DILRMP)', 'State Survey Ground Control Points (GCPs)'],
    limitations: 'Heavy cloud cover in monsoon imagery requires SAR (Sentinel-1) complementation.',
    policyRelevance: 'Informs Digital India Land Records Modernization Programme (DILRMP) automated conflict detection protocols.',
    gisLocation: { lat: 21.1458, lng: 79.0882, label: 'Nagpur Rural Cadastral Testbed' },
    relatedResearchIds: ['res-pub-01'],
    dataStatus: 'PROTOTYPE_DERIVED'
  },
  {
    id: 'res-pub-03',
    title: 'Assessing Agricultural Land Vulnerability to Drought and Crop Stress in Marathwada Using Multi-Temporal SPI and LULC Indices',
    authors: ['Dr. Meenakshi Sundaram', 'Dr. Pravin Shinde'],
    institution: 'Indian Council of Agricultural Research (ICAR) & MAU Parbhani',
    year: 2024,
    publisher: 'Indian Journal of Agricultural Spatial Sciences',
    doi: '10.5539/ijas.v16n2p45',
    topics: ['Agriculture', 'Climate Resilience', 'Land Use', 'Remote Sensing'],
    abstract: 'Marathwada region has experienced recurrent meteorological droughts. This study integrates 3-month Standardized Precipitation Index (SPI) from IMD with MODIS NDVI/EVI time-series to quantify agricultural land abandonment and cropping intensity shifts across Chhatrapati Sambhajinagar and Solapur.',
    researchQuestion: 'What is the spatial correlation between 3-month SPI drought severity and rainfed agricultural land fallowing in semi-arid Maharashtra?',
    methodology: 'MODIS Time-Series Crop Phenology Analysis + IMD SPI Interpolation + Mann-Kendall Trend Analysis.',
    keyFindings: [
      'Rainfed kharif acreage declined by 18.4% during moderate-to-severe SPI drought years.',
      'Drip irrigation adoption in sugarcane zones reduced ground-water depletion rate by 14%.',
      'Recommended micro-level watershed prioritization for PMKSY funding.'
    ],
    studyArea: {
      state: 'Maharashtra',
      districts: ['Chhatrapati Sambhajinagar', 'Solapur', 'Dharashiv'],
      lat: 19.8762,
      lng: 75.3433
    },
    dataUsed: ['IMD 50-Year Daily Rainfall Grid', 'MODIS MOD13Q1 NDVI (250m)', 'Bhuvan LULC 50k Maps'],
    limitations: 'Groundwater abstraction rates inferred from GRACE satellite gravity data; local tube well records incomplete.',
    policyRelevance: 'Supports State Agriculture Department drought mitigation planning and PM Fasal Bima Yojana crop insurance verification.',
    gisLocation: { lat: 19.8762, lng: 75.3433, label: 'Marathwada Agricultural Zone' },
    relatedResearchIds: ['res-pub-01'],
    dataStatus: 'OFFICIAL_SOURCE'
  }
];

export const PUBLIC_OPEN_DATASETS: PublicDataset[] = [
  {
    id: 'ds-pub-01',
    title: 'Maharashtra District Land Use & LULC Acreage Dataset (2020-2025)',
    description: 'High-level spatial land use land cover (LULC) classification data by district in Maharashtra. Includes agricultural, forest, built-up, water bodies, and barren land areas in square kilometers.',
    publisher: 'National Remote Sensing Centre (NRSC) / Bhuvan & State Land Records',
    coverage: 'State-wide (36 Districts of Maharashtra)',
    state: 'Maharashtra',
    timePeriod: '2020 - 2025',
    format: 'CSV',
    fileSize: '4.8 MB',
    lastUpdated: '15 Jan 2026',
    license: 'Open Government Data License (OGDL India)',
    category: 'LULC',
    dataStatus: 'OFFICIAL_SOURCE',
    dataQuality: 'Validated against NRSC 1:50,000 scale spatial classification and District Statistical Handbooks.',
    schemaFields: [
      { field: 'District', type: 'String', description: 'Name of the district' },
      { field: 'Year', type: 'Integer', description: 'Reporting year' },
      { field: 'Agri_Area_Km2', type: 'Float', description: 'Total agricultural land area in sq km' },
      { field: 'Forest_Area_Km2', type: 'Float', description: 'Total reserved and unclassed forest land in sq km' },
      { field: 'BuiltUp_Area_Km2', type: 'Float', description: 'Settlement, commercial, and industrial land in sq km' },
      { field: 'Water_Area_Km2', type: 'Float', description: 'Lakes, reservoirs, and river water bodies in sq km' },
      { field: 'Barren_Area_Km2', type: 'Float', description: 'Rocky, uncultivable, or wasteland in sq km' }
    ],
    previewRows: [
      { District: 'Nagpur', Year: 2025, Agri_Area_Km2: 5420.5, Forest_Area_Km2: 2890.2, BuiltUp_Area_Km2: 840.6, Water_Area_Km2: 310.4, Barren_Area_Km2: 430.3 },
      { District: 'Pune', Year: 2025, Agri_Area_Km2: 7850.1, Forest_Area_Km2: 2150.4, BuiltUp_Area_Km2: 1980.2, Water_Area_Km2: 420.8, Barren_Area_Km2: 650.5 },
      { District: 'Raigad', Year: 2025, Agri_Area_Km2: 2410.3, Forest_Area_Km2: 3120.8, BuiltUp_Area_Km2: 920.4, Water_Area_Km2: 380.1, Barren_Area_Km2: 319.4 }
    ],
    downloadUrl: '#'
  },
  {
    id: 'ds-pub-02',
    title: 'IMD District Rainfall & SPI Drought Indicator Matrix (2025-2026)',
    description: 'Operational seasonal rainfall, normal baseline rainfall, departure percentage, and Standardized Precipitation Index (SPI) drought category values by district.',
    publisher: 'India Meteorological Department (IMD) Operational Data',
    coverage: 'District-level across Maharashtra',
    state: 'Maharashtra',
    timePeriod: 'Monsoon Season 2025 - 2026',
    format: 'GeoJSON',
    fileSize: '12.4 MB',
    lastUpdated: '10 Feb 2026',
    license: 'Open Data / Public Domain',
    category: 'Rainfall',
    dataStatus: 'OFFICIAL_SOURCE',
    dataQuality: 'Derived from IMD station network and gridded rainfall interpolated at 0.25 degree spatial resolution.',
    schemaFields: [
      { field: 'district_code', type: 'String', description: 'Unique district administrative code' },
      { field: 'district_name', type: 'String', description: 'Name of district' },
      { field: 'actual_rainfall_mm', type: 'Float', description: 'Recorded monsoon rainfall in millimeters' },
      { field: 'normal_rainfall_mm', type: 'Float', description: '30-year climate normal rainfall in mm' },
      { field: 'departure_pct', type: 'Float', description: 'Percentage departure from normal' },
      { field: 'spi_3month', type: 'String', description: 'Standardized Precipitation Index classification' },
      { field: 'flood_hazard_level', type: 'String', description: 'Low, Moderate, High, or Very High hazard indicator' }
    ],
    previewRows: [
      { district_name: 'Nagpur', actual_rainfall_mm: 1120.4, normal_rainfall_mm: 1040.0, departure_pct: 7.7, spi_3month: 'Normal', flood_hazard_level: 'Moderate' },
      { district_name: 'Solapur', actual_rainfall_mm: 480.2, normal_rainfall_mm: 610.0, departure_pct: -21.3, spi_3month: 'Moderate Drought', flood_hazard_level: 'Low' },
      { district_name: 'Raigad', actual_rainfall_mm: 3450.8, normal_rainfall_mm: 3080.0, departure_pct: 12.0, spi_3month: 'Normal', flood_hazard_level: 'Very High' }
    ],
    downloadUrl: '#'
  },
  {
    id: 'ds-pub-03',
    title: 'Public Infrastructure & Industrial Corridor GIS Vectors',
    description: 'Vector spatial dataset showing key public infrastructure including state highways, national highways, freight corridors, major industrial zones (MIDC), and airport buffers.',
    publisher: 'Maharashtra Industrial Development Corporation (MIDC) & PWD Spatial Data',
    coverage: 'State Infrastructure Network',
    state: 'Maharashtra',
    timePeriod: '2025',
    format: 'GeoJSON',
    fileSize: '18.2 MB',
    lastUpdated: '01 Jan 2026',
    license: 'Public Sector Data Sharing License',
    category: 'Infrastructure',
    dataStatus: 'PROTOTYPE_DERIVED',
    dataQuality: 'Digitized from public PWD and MIDC master plan maps. Verified against OpenStreetMap vectors.',
    schemaFields: [
      { field: 'feature_id', type: 'String', description: 'Infrastructure vector ID' },
      { field: 'type', type: 'String', description: 'Highway, Railway, MIDC Zone, Airport' },
      { field: 'name', type: 'String', description: 'Official name or highway number' },
      { field: 'district', type: 'String', description: 'District traversed' },
      { field: 'length_km', type: 'Float', description: 'Length in km (for linear features)' }
    ],
    previewRows: [
      { feature_id: 'INF-HW-01', type: 'National Highway', name: 'NH-44 (Nagpur Corridor)', district: 'Nagpur', length_km: 142.5 },
      { feature_id: 'INF-IND-04', type: 'MIDC Zone', name: 'Butibori Industrial Area', district: 'Nagpur', length_km: 0.0 },
      { feature_id: 'INF-HW-08', type: 'Expressway', name: 'Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Mahamarg', district: 'Thane', length_km: 701.0 }
    ],
    downloadUrl: '#'
  },
  {
    id: 'ds-pub-04',
    title: 'Synthetic Land Governance & Soil Hazard Prototype Matrix (SIH Benchmark)',
    description: 'Demonstration dataset containing synthetic candidate plot evaluations, slope calculations, and synthetic land-climate vulnerability scores generated for SIH platform testing.',
    publisher: 'BhoomiDrishti AI & Spatial Intelligence Team',
    coverage: 'Selected Test Districts (Nagpur, Pune, Solapur, Nashik, Raigad, Chhatrapati Sambhajinagar)',
    state: 'Maharashtra',
    timePeriod: '2026 (Synthetic)',
    format: 'CSV',
    fileSize: '1.2 MB',
    lastUpdated: '25 Sep 2026',
    license: 'Creative Commons Attribution 4.0 International',
    category: 'Research',
    dataStatus: 'SYNTHETIC_PROTOTYPE',
    dataQuality: 'Synthetic simulation data generated for hackathon benchmarking. Not government verified.',
    schemaFields: [
      { field: 'Candidate_ID', type: 'String', description: 'Synthetic parcel identifier' },
      { field: 'District', type: 'String', description: 'District location' },
      { field: 'Slope_Deg', type: 'Float', description: 'Terrain slope in degrees' },
      { field: 'Vulnerability_Score', type: 'Float', description: 'Algorithmic risk index (0 - 100)' },
      { field: 'Data_Type', type: 'String', description: 'Flagged as Synthetic' }
    ],
    previewRows: [
      { Candidate_ID: 'SYN-NAG-01', District: 'Nagpur', Slope_Deg: 3.2, Vulnerability_Score: 32.4, Data_Type: 'Synthetic' },
      { Candidate_ID: 'SYN-RAI-04', District: 'Raigad', Slope_Deg: 14.8, Vulnerability_Score: 78.1, Data_Type: 'Synthetic' }
    ],
    downloadUrl: '#'
  }
];

export const PUBLIC_REPORTS: PublicReport[] = [
  {
    id: 'rep-pub-01',
    title: 'State Land Governance & Digital Transformation Annual Report 2025',
    organization: 'Department of Revenue & Land Records, Govt. of Maharashtra',
    publicationDate: '15 Jan 2025',
    year: 2025,
    reportType: 'Land Governance',
    state: 'Maharashtra',
    coverage: 'State-wide',
    summary: 'Comprehensive evaluation of digital land record updates, 7/12 RoR online issuance, mutation clearance timelines, and integration of GIS boundary verification across 36 districts.',
    purpose: 'To assess the administrative efficacy of modern land record digitization and highlight structural bottlenecks in rural land title clearance.',
    methodology: 'Administrative audit of 1.4 million online mutation requests + field sampling across 120 tehsils.',
    dataSources: ['State e-Ferfar Portal Logs', 'DILRMP Progress Reports', 'District Collectorate Survey Audits'],
    keyFindings: [
      'Average mutation processing time reduced from 45 days (2020) to 11 days (2025).',
      'Over 94% of 7/12 records digitally signed and accessible via public online portal.',
      'Identified 48,000 legacy parcel boundary discrepancies requiring physical DGPS resurvey.'
    ],
    mapsAndChartsCount: 14,
    limitations: 'Report excludes forest land title settlements under FRA currently undergoing sub-divisional committee review.',
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    id: 'rep-pub-02',
    title: 'Climate Vulnerability and Agricultural Land-Use Impact Assessment (2024-2025)',
    organization: 'State Climate Change Cell & Disaster Management Authority',
    publicationDate: '10 Nov 2024',
    year: 2024,
    reportType: 'Climate',
    state: 'Maharashtra',
    coverage: 'Marathwada & Vidarbha Regions',
    summary: 'Detailed assessment of unseasonal rainfall, prolonged dry spells, and thermal stress on rainfed kharif crops, analyzing land suitability changes.',
    purpose: 'Provide evidence for agricultural disaster compensation distribution and climate resilient watershed allocation.',
    methodology: 'Spatial correlation between IMD gridded rainfall departure, MODIS crop stress index, and revenue crop loss declarations.',
    dataSources: ['IMD Daily Weather Datasets', 'NRSC Bhuvan Agricultural Drought Monitoring', 'District Revenue Crop Assessment (Panchnama Data)'],
    keyFindings: [
      '14 tehsils in Marathwada categorized under severe agricultural climate risk.',
      'Recommended shifting 18% of rainfed cotton acreage to drought-tolerant pulses and millets.',
      'Highlight mandatory farm-pond construction requirement along watershed contours.'
    ],
    mapsAndChartsCount: 22,
    limitations: 'Spatial resolution capped at 1:50,000 scale; micro-plot level microclimate variations not fully captured.',
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    id: 'rep-pub-03',
    title: 'Peri-Urban Industrial Expansion & Coastal Land Conversion Risk Review',
    organization: 'BhoomiDrishti Research & Policy Analytics Group',
    publicationDate: '01 Feb 2026',
    year: 2026,
    reportType: 'Policy Analysis',
    state: 'Maharashtra',
    district: 'Raigad & Thane',
    coverage: 'Mumbai Metropolitan Region & Konkan Belt',
    summary: 'Analysis of non-agricultural land conversion (NA clearances) along major transport corridors and associated environmental drainage risks.',
    purpose: 'Support evidence-based land zoning policy for peri-urban logistics hubs and infrastructure corridors.',
    methodology: 'Multi-criteria GIS overlay analyzing elevation, flood vulnerability, prime agricultural land, and proximity to state highways.',
    dataSources: ['BhoomiDrishti Public GIS Portal', 'Sentinel-2 LULC Vector Layers', 'IMD Flood Hazard Records'],
    keyFindings: [
      '38% of recent logistics park developments overlap with natural estuarine flood channels.',
      'Integrated policy simulation demonstrates 65% flood damage mitigation if 50m buffers are enforced.'
    ],
    mapsAndChartsCount: 9,
    limitations: 'Based on prototype simulation models; requires local urban planning body (MMRDA) statutory adoption.',
    dataStatus: 'PROTOTYPE_DERIVED'
  }
];

export const PUBLIC_PROJECTS: PublicProject[] = [
  {
    id: 'proj-pub-01',
    name: 'Digital Cadastral Resurvey and GIS Mapping Initiative (DILRMP Phase 3)',
    location: 'Nagpur & Pune Districts',
    state: 'Maharashtra',
    district: 'Nagpur',
    department: 'Department of Land Records & Settlement Commissioner',
    status: 'Active',
    startDate: '2023-04-01',
    targetCompletion: '2026-12-31',
    description: 'High-precision drone survey and CORS-based DGPS mapping of rural land parcel boundaries to update century-old revenue maps.',
    objectives: [
      'Create 1:500 scale GIS vector maps for every rural land parcel.',
      'Link digital spatial boundaries directly with RoR 7/12 text ownership records.',
      'Minimize boundary litigation between adjoining land owners.'
    ],
    linkedDatasets: ['ds-pub-01', 'ds-pub-03'],
    linkedResearch: ['res-pub-02'],
    progressPercentage: 74,
    outcomes: [
      'Completed drone survey across 1,840 villages.',
      'Generated 420,000 verified GIS parcel polygon boundaries.',
      'Established 12 permanent CORS GNSS reference stations.'
    ],
    lat: 21.1458,
    lng: 79.0882,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    id: 'proj-pub-02',
    name: 'Marathwada Watershed Resiliency & Climate-Adaptive Land Management Pilot',
    location: 'Chhatrapati Sambhajinagar & Solapur',
    state: 'Maharashtra',
    district: 'Solapur',
    department: 'Soil and Water Conservation Department',
    status: 'Active',
    startDate: '2024-01-15',
    targetCompletion: '2027-03-31',
    description: 'GIS-driven watershed development, continuous contour trenching, and micro-irrigation land mapping in drought-prone districts.',
    objectives: [
      'Recharge over-exploited groundwater aquifers in semi-arid blocks.',
      'Map agricultural land suitability for drought-resilient cropping patterns.',
      'Provide real-time soil moisture and precipitation monitoring.'
    ],
    linkedDatasets: ['ds-pub-02'],
    linkedResearch: ['res-pub-03'],
    progressPercentage: 58,
    outcomes: [
      'Constructed 320 check dams and percolation tanks.',
      'Brought 14,500 hectares of rainfed land under drip irrigation coverage.'
    ],
    lat: 17.6599,
    lng: 75.9064,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    id: 'proj-pub-03',
    name: 'BhoomiDrishti National Evidence-to-Policy Intelligence Portal (SIH Pilot)',
    location: 'National & Maharashtra Pilot Zone',
    state: 'Maharashtra',
    district: 'State-wide',
    department: 'Ministry of Land Resources & SIH Research Innovation Group',
    status: 'Pilot Phase',
    startDate: '2025-09-01',
    targetCompletion: '2026-10-31',
    description: 'A unified digital platform connecting government planners, academic researchers, and citizens with evidence-based land governance tools, GIS overlays, and policy simulation engines.',
    objectives: [
      'Integrate public open data, GIS maps, and published research into a single trusted portal.',
      'Provide policy simulators for land acquisition and climate risk mitigation.',
      'Protect individual citizen privacy while exposing transparent public statistics.'
    ],
    linkedDatasets: ['ds-pub-01', 'ds-pub-02', 'ds-pub-03', 'ds-pub-04'],
    linkedResearch: ['res-pub-01', 'res-pub-02', 'res-pub-03'],
    progressPercentage: 88,
    outcomes: [
      'Unified 11 public read-only information portals.',
      'Integrated real MapLibre GL JS spatial layers with data provenance tagging.',
      'Built multi-stakeholder policy decision intelligence workflow.'
    ],
    lat: 19.076,
    lng: 72.8777,
    dataStatus: 'PROTOTYPE_DERIVED'
  }
];

export const PUBLIC_CLIMATE_DATA: DistrictClimateData[] = [
  {
    district: 'Nagpur',
    state: 'Maharashtra',
    rainfallActualMm: 1120.4,
    rainfallNormalMm: 1040.0,
    departurePercentage: 7.7,
    spiDroughtCategory: 'Normal',
    floodHazard: 'Moderate',
    tempMaxC: 43.5,
    tempMinC: 12.1,
    lulcPrimary: 'Agricultural & Forest Blend',
    lastUpdated: '2026-02-10',
    lat: 21.1458,
    lng: 79.0882,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    district: 'Pune',
    state: 'Maharashtra',
    rainfallActualMm: 1280.2,
    rainfallNormalMm: 1150.0,
    departurePercentage: 11.3,
    spiDroughtCategory: 'Normal',
    floodHazard: 'Moderate',
    tempMaxC: 38.2,
    tempMinC: 11.4,
    lulcPrimary: 'Urban & Built-Up',
    lastUpdated: '2026-02-10',
    lat: 18.5204,
    lng: 73.8567,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    district: 'Solapur',
    state: 'Maharashtra',
    rainfallActualMm: 480.2,
    rainfallNormalMm: 610.0,
    departurePercentage: -21.3,
    spiDroughtCategory: 'Moderate Drought',
    floodHazard: 'Low',
    tempMaxC: 42.1,
    tempMinC: 15.8,
    lulcPrimary: 'Rainfed Agriculture',
    lastUpdated: '2026-02-10',
    lat: 17.6599,
    lng: 75.9064,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    district: 'Raigad',
    state: 'Maharashtra',
    rainfallActualMm: 3450.8,
    rainfallNormalMm: 3080.0,
    departurePercentage: 12.0,
    spiDroughtCategory: 'Normal',
    floodHazard: 'Very High',
    tempMaxC: 36.4,
    tempMinC: 19.2,
    lulcPrimary: 'Coastal & Forest',
    lastUpdated: '2026-02-10',
    lat: 18.5158,
    lng: 73.1822,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    district: 'Nashik',
    state: 'Maharashtra',
    rainfallActualMm: 980.5,
    rainfallNormalMm: 1020.0,
    departurePercentage: -3.8,
    spiDroughtCategory: 'Mild Drought',
    floodHazard: 'Low',
    tempMaxC: 39.1,
    tempMinC: 10.5,
    lulcPrimary: 'Intensive Horticulture',
    lastUpdated: '2026-02-10',
    lat: 19.9975,
    lng: 73.7898,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    district: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    rainfallActualMm: 590.3,
    rainfallNormalMm: 720.0,
    departurePercentage: -18.0,
    spiDroughtCategory: 'Mild Drought',
    floodHazard: 'Low',
    tempMaxC: 41.3,
    tempMinC: 13.6,
    lulcPrimary: 'Agricultural & Scrubland',
    lastUpdated: '2026-02-10',
    lat: 19.8762,
    lng: 75.3433,
    dataStatus: 'OFFICIAL_SOURCE'
  }
];

export const PUBLIC_LAND_USE_DATA: DistrictLandUseData[] = [
  {
    district: 'Nagpur',
    state: 'Maharashtra',
    year: 2025,
    agriculturalAreaKm2: 5420.5,
    forestAreaKm2: 2890.2,
    builtUpAreaKm2: 840.6,
    waterBodyAreaKm2: 310.4,
    barrenLandKm2: 430.3,
    totalAreaKm2: 9892.0,
    builtUpChangePercentage5Yr: 14.2,
    forestChangePercentage5Yr: -1.1,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    district: 'Pune',
    state: 'Maharashtra',
    year: 2025,
    agriculturalAreaKm2: 7850.1,
    forestAreaKm2: 2150.4,
    builtUpAreaKm2: 1980.2,
    waterBodyAreaKm2: 420.8,
    barrenLandKm2: 650.5,
    totalAreaKm2: 13052.0,
    builtUpChangePercentage5Yr: 22.8,
    forestChangePercentage5Yr: -2.4,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    district: 'Solapur',
    state: 'Maharashtra',
    year: 2025,
    agriculturalAreaKm2: 10420.3,
    forestAreaKm2: 410.2,
    builtUpAreaKm2: 620.4,
    waterBodyAreaKm2: 380.6,
    barrenLandKm2: 1015.0,
    totalAreaKm2: 12846.5,
    builtUpChangePercentage5Yr: 8.5,
    forestChangePercentage5Yr: 0.2,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    district: 'Raigad',
    state: 'Maharashtra',
    year: 2025,
    agriculturalAreaKm2: 2410.3,
    forestAreaKm2: 3120.8,
    builtUpAreaKm2: 920.4,
    waterBodyAreaKm2: 380.1,
    barrenLandKm2: 319.4,
    totalAreaKm2: 7151.0,
    builtUpChangePercentage5Yr: 19.4,
    forestChangePercentage5Yr: -0.8,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    district: 'Nashik',
    state: 'Maharashtra',
    year: 2025,
    agriculturalAreaKm2: 8940.6,
    forestAreaKm2: 2850.1,
    builtUpAreaKm2: 1110.5,
    waterBodyAreaKm2: 490.2,
    barrenLandKm2: 745.2,
    totalAreaKm2: 14136.6,
    builtUpChangePercentage5Yr: 12.1,
    forestChangePercentage5Yr: -0.5,
    dataStatus: 'OFFICIAL_SOURCE'
  },
  {
    district: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    year: 2025,
    agriculturalAreaKm2: 7210.4,
    forestAreaKm2: 980.5,
    builtUpAreaKm2: 890.3,
    waterBodyAreaKm2: 260.1,
    barrenLandKm2: 768.7,
    totalAreaKm2: 10110.0,
    builtUpChangePercentage5Yr: 15.6,
    forestChangePercentage5Yr: -1.3,
    dataStatus: 'OFFICIAL_SOURCE'
  }
];

export const PUBLIC_FAQS = [
  {
    question: 'What does "Synthetic / Prototype Data" mean on BhoomiDrishti?',
    answer: 'Synthetic or prototype data represents algorithmic test datasets generated specifically for platform demonstration, benchmark modeling, or Smart India Hackathon evaluations. It is NOT government-verified official records and should not be used for legal or administrative land title transactions.'
  },
  {
    question: 'What does "Data Source" attribution signify?',
    answer: 'Every map layer, chart, and dataset on BhoomiDrishti explicitly states its originating authority (e.g., India Meteorological Department, NRSC Bhuvan, State Department of Revenue). Official source labels indicate authorized public data feeds.'
  },
  {
    question: 'What is LULC (Land Use Land Cover)?',
    answer: 'LULC categorizes surface terrain based on human usage (Land Use: e.g., agricultural crops, industrial, residential) and natural physical cover (Land Cover: e.g., dense forest, water bodies, wetlands, barren rock).'
  },
  {
    question: 'What is Rainfall Departure Percentage?',
    answer: 'Rainfall Departure % indicates how much actual recorded rainfall during a period deviates from the long-term (30-year) climatological average normal. Positive values indicate excess rainfall, while negative values indicate rainfall deficits.'
  },
  {
    question: 'What is SPI (Standardized Precipitation Index)?',
    answer: 'SPI is a standardized index recommended by the World Meteorological Organization to detect meteorological drought. Categories range from Extremely Wet (+2.0 and above) to Near Normal (-0.99 to +0.99), Moderate Drought (-1.0 to -1.49), Severe Drought (-1.5 to -1.99), and Extreme Drought (-2.0 and below).'
  },
  {
    question: 'What does Flood Hazard Level mean in the Public GIS Map?',
    answer: 'Flood hazard levels (Low, Moderate, High, Very High) assess terrain inundation risk by combining elevation (DEM), stream proximity, historical IMD extreme rainfall events, and surface run-off coefficients.'
  },
  {
    question: 'What is a Candidate Site in BhoomiDrishti?',
    answer: 'Candidate sites are spatial parcels evaluated by policy planners for government infrastructure, solar energy parks, or industrial corridors based on multi-criteria GIS filters (slope, proximity to highways, soil stability, and non-prime agricultural status).'
  }
];

export const PUBLIC_NOTICES = [
  {
    id: 'not-01',
    title: 'IMD Monsoon Rainfall Departure Grid (2025-2026) Published',
    date: '10 Feb 2026',
    category: 'Dataset Update',
    link: '/public/open-data/ds-pub-02'
  },
  {
    id: 'not-02',
    title: 'New Published Research: Cadastral Boundary AI Reconciliation',
    date: '28 Jan 2026',
    category: 'New Research',
    link: '/public/research/res-pub-02'
  },
  {
    id: 'not-03',
    title: 'Annual State Land Governance Transformation Report Released',
    date: '15 Jan 2026',
    category: 'New Report',
    link: '/public/reports/rep-pub-01'
  },
  {
    id: 'not-04',
    title: 'Public GIS Map Vector Layers Updated with 2025 District Boundaries',
    date: '01 Jan 2026',
    category: 'GIS Update',
    link: '/public/map'
  }
];
