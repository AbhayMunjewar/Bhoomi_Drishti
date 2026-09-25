export interface DataPipelineStatus {
  service: string;
  category: string;
  status: 'Healthy' | 'Available' | 'Restricted / Cached Fallback' | 'Degraded' | 'Unavailable';
  lastSync: string;
  lastAttempt: string;
  details: string;
}

export interface DataQualityMetrics {
  completeness: number; // 0-100%
  duplicatesPercentage: number; // 0-100%
  missingValuesPercentage: number; // 0-100%
  invalidValuesPercentage: number; // 0-100%
  consistencyScore: number; // 0-100%
  freshnessStatus: 'Fresh' | 'Due Soon' | 'Stale' | 'Unknown';
  spatialIntegrity: number; // 0-100%
}

export interface DatasetColumnSchema {
  column: string;
  dataType: 'String' | 'Integer' | 'Float' | 'Geometry (Polygon)' | 'Geometry (Point)' | 'DateTime' | 'Boolean';
  nullable: boolean;
  description: string;
}

export interface DatasetVersionItem {
  version: string;
  releaseDate: string;
  recordsCount: number;
  changesSummary: string;
  createdBy: string;
  status: 'Active' | 'Archived' | 'Draft';
  fileFormat: string;
  sizeMb: number;
}

export interface GISLayerDetail {
  id: string;
  name: string;
  category: 'BOUNDARIES' | 'LAND' | 'CLIMATE' | 'ENVIRONMENT' | 'INFRASTRUCTURE' | 'RESEARCH' | 'PROJECTS';
  type: 'Vector Polygon' | 'Vector Line' | 'Raster Grid' | 'Point Feature';
  source: string;
  crs: string; // EPSG:4326
  featureCount: number;
  coverage: string;
  geometryType: 'Polygon' | 'MultiPolygon' | 'LineString' | 'Point' | 'Raster';
  lastUpdated: string;
  status: 'Available' | 'Under Validation' | 'Restricted' | 'Stale' | 'Invalid';
  visibility: 'Public' | 'Departmental Only' | 'Restricted Admin';
  boundingBox: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
}

export interface DataSourceItem {
  id: string;
  name: string;
  organization: string;
  type: 'National Meteorological Dept' | 'National Remote Sensing Agency' | 'Open Govt Portal' | 'State Land Revenue' | 'Academic Research' | 'BhoomiDrishti System';
  connectionStatus: 'Live WMS/WFS' | 'Restricted / Cached Fallback' | 'Automated Daily Pull' | 'Manual Batch Upload';
  lastSync: string;
  datasetsCount: number;
  officialUrl: string;
  license: string;
  attributionRequired: boolean;
  knownLimitations: string;
  apiAccessState: 'Direct API Active' | 'Restricted / Serving Cached Snapshot' | 'API Key Required' | 'Offline Prototype';
}

export interface DataConflictRecord {
  id: string;
  parcelId: string;
  location: string;
  district: string;
  datasetA: string;
  datasetB: string;
  revenueAreaHa: number;
  satelliteAreaHa: number;
  differenceAreaHa: number;
  detectedDate: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'New' | 'Under Investigation' | 'Resolved' | 'Dismissed';
  assignedOfficer: string;
  lat: number;
  lng: number;
  description: string;
  comments: { user: string; date: string; comment: string }[];
}

export interface DataActivityItem {
  id: string;
  timestamp: string;
  user: string;
  action: 'Uploaded Dataset' | 'Validated Geometry' | 'Updated Metadata' | 'Created Version' | 'Resolved Conflict' | 'Executed Spatial Analysis' | 'Flagged Discrepancy';
  datasetOrLayer: string;
  details: string;
  status: 'Success' | 'Warning' | 'Failed';
}

export interface SpatialAnalysisJob {
  id: string;
  title: string;
  operation: 'Buffer' | 'Intersect' | 'Spatial Join' | 'Distance Calculation' | 'Clip' | 'Point-in-Polygon';
  sourceLayer: string;
  targetLayer: string;
  parameters: string;
  executedDate: string;
  outputFeaturesCount: number;
  status: 'Completed' | 'Running' | 'Failed';
}

// -------------------------------------------------------------
// MOCK DATA OFFICERS & BACKEND RECORDS
// -------------------------------------------------------------

export const MOCK_DATA_PIPELINE_STATUS: DataPipelineStatus[] = [
  {
    service: 'PostgreSQL / PostGIS 15 Spatial DB',
    category: 'Spatial Database',
    status: 'Healthy',
    lastSync: 'Real-time',
    lastAttempt: 'Real-time',
    details: 'PostGIS extension v3.3 active with 42 spatial layer tables indexed.'
  },
  {
    service: 'MapLibre GIS Vector Tile Server',
    category: 'GIS Tile Engine',
    status: 'Healthy',
    lastSync: 'Real-time',
    lastAttempt: 'Real-time',
    details: 'Serving MVT vector tiles with average tile latency of 18ms.'
  },
  {
    service: 'IMD Operational Climate API Connector',
    category: 'Meteorological Data',
    status: 'Restricted / Cached Fallback',
    lastSync: '2026-02-10 08:00',
    lastAttempt: '2026-09-25 16:00',
    details: 'Direct IP whitelisting pending authorization; serving operational cached snapshot (36 districts).'
  },
  {
    service: 'NRSC Bhuvan Spatial Vector Catalogue',
    category: 'Satellite Remote Sensing',
    status: 'Available',
    lastSync: '2026-02-25 04:30',
    lastAttempt: '2026-02-25 04:30',
    details: 'Active WMS/WFS vector feeds for LULC and land parcel extractions.'
  }
];

export const MOCK_DATA_SOURCES: DataSourceItem[] = [
  {
    id: 'src-imd',
    name: 'India Meteorological Department (IMD)',
    organization: 'Ministry of Earth Sciences, Govt. of India',
    type: 'National Meteorological Dept',
    connectionStatus: 'Restricted / Cached Fallback',
    lastSync: '2026-02-10 08:00',
    datasetsCount: 4,
    officialUrl: 'https://mausam.imd.gov.in',
    license: 'Open Government Data License (OGDL)',
    attributionRequired: true,
    knownLimitations: 'Direct API access requires institutional IP whitelisting. Serves cached daily fallback snapshot.',
    apiAccessState: 'Restricted / Serving Cached Snapshot'
  },
  {
    id: 'src-bhuvan',
    name: 'Bhuvan NRSC Geospatial Data Portal',
    organization: 'National Remote Sensing Centre (ISRO)',
    type: 'National Remote Sensing Agency',
    connectionStatus: 'Live WMS/WFS',
    lastSync: '2026-02-25 04:30',
    datasetsCount: 18,
    officialUrl: 'https://bhuvan.nrsc.gov.in',
    license: 'ISRO Data Sharing Policy',
    attributionRequired: true,
    knownLimitations: 'High resolution optical imagery tiles updated quarterly; vector layers synced weekly.',
    apiAccessState: 'Direct API Active'
  },
  {
    id: 'src-datagov',
    name: 'Open Government Data (data.gov.in)',
    organization: 'National Informatics Centre (NIC)',
    type: 'Open Govt Portal',
    connectionStatus: 'Automated Daily Pull',
    lastSync: '2026-02-24 12:00',
    datasetsCount: 12,
    officialUrl: 'https://data.gov.in',
    license: 'Open Government Data License (OGDL)',
    attributionRequired: true,
    knownLimitations: 'Tabular datasets refreshed according to publishing department schedules.',
    apiAccessState: 'Direct API Active'
  },
  {
    id: 'src-mah-revenue',
    name: 'Maharashtra Land Revenue & Cadastral Records',
    organization: 'Department of Revenue & Land Records, Govt. of MH',
    type: 'State Land Revenue',
    connectionStatus: 'Live WMS/WFS',
    lastSync: '2026-02-25 02:00',
    datasetsCount: 24,
    officialUrl: 'https://mahabhumi.gov.in',
    license: 'State Revenue Policy / Departmental',
    attributionRequired: true,
    knownLimitations: 'Legacy paper survey records undergoing vector digitization.',
    apiAccessState: 'Direct API Active'
  },
  {
    id: 'src-bhoomidrishti-proto',
    name: 'BhoomiDrishti Synthetic & Model-Derived Pilot Dataset',
    organization: 'BhoomiDrishti Research & GIS Team (SIH 26019)',
    type: 'BhoomiDrishti System',
    connectionStatus: 'Manual Batch Upload',
    lastSync: '2026-09-25 10:00',
    datasetsCount: 6,
    officialUrl: 'https://bhoomidrishti.gov.in/proto',
    license: 'SIH Research Prototype License',
    attributionRequired: false,
    knownLimitations: 'Synthetic simulation parameters created for demonstration & decision testing.',
    apiAccessState: 'Offline Prototype'
  }
];

export const MOCK_OFFICER_DATASETS = [
  {
    id: 'ds-ofc-01',
    title: 'Maharashtra District Land Use & LULC Acreage Vector',
    source: 'NRSC Bhuvan & State Revenue Dept',
    category: 'LULC',
    coverage: 'State-wide (36 Districts)',
    records: 36,
    lastUpdated: '15 Jan 2026',
    version: 'v2.4',
    qualityScore: 98,
    status: 'Verified',
    verificationStatus: 'OFFICIAL_SOURCE',
    format: 'GeoJSON Vector',
    license: 'ISRO Data Sharing Policy',
    description: 'High-resolution land use and land cover vector geometries covering all 36 districts of Maharashtra.',
    schema: [
      { column: 'district_code', dataType: 'String', nullable: false, description: 'Census 2011 district identification code' },
      { column: 'district_name', dataType: 'String', nullable: false, description: 'Official district name' },
      { column: 'agriculture_ha', dataType: 'Float', nullable: false, description: 'Net sown agricultural land area in hectares' },
      { column: 'builtup_ha', dataType: 'Float', nullable: false, description: 'Urban & rural settlement built-up footprint in hectares' },
      { column: 'forest_ha', dataType: 'Float', nullable: false, description: 'Recorded forest cover area in hectares' },
      { column: 'waterbodies_ha', dataType: 'Float', nullable: false, description: 'Surface water reservoirs, rivers & lakes in hectares' },
      { column: 'geometry', dataType: 'Geometry (Polygon)', nullable: false, description: 'Multipolygon district spatial boundary EPSG:4326' }
    ],
    quality: {
      completeness: 98.8,
      duplicatesPercentage: 0.0,
      missingValuesPercentage: 1.2,
      invalidValuesPercentage: 0.0,
      consistencyScore: 99.1,
      freshnessStatus: 'Fresh',
      spatialIntegrity: 100.0
    }
  },
  {
    id: 'ds-ofc-02',
    title: 'IMD Operational District Monsoon Rainfall & SPI Matrix',
    source: 'India Meteorological Department (IMD)',
    category: 'Climate & Rainfall',
    coverage: 'District-level MH',
    records: 36,
    lastUpdated: '10 Feb 2026',
    version: 'v2026.1',
    qualityScore: 99,
    status: 'Verified',
    verificationStatus: 'OFFICIAL_SOURCE',
    format: 'CSV / GeoJSON',
    license: 'Open Government Data License (OGDL)',
    description: 'Operational seasonal rainfall deviation, standardized precipitation index (SPI) and drought risk classifications.',
    schema: [
      { column: 'district', dataType: 'String', nullable: false, description: 'District Name' },
      { column: 'normal_mm', dataType: 'Float', nullable: false, description: 'Long Period Average (LPA) normal monsoon rainfall in mm' },
      { column: 'actual_mm', dataType: 'Float', nullable: false, description: 'Actual recorded monsoon rainfall in mm' },
      { column: 'departure_pct', dataType: 'Float', nullable: false, description: 'Percentage departure from normal rainfall' },
      { column: 'spi_index', dataType: 'Float', nullable: false, description: 'Standardized Precipitation Index score' },
      { column: 'drought_status', dataType: 'String', nullable: false, description: 'Drought severity classification (Normal, Moderate, Severe)' }
    ],
    quality: {
      completeness: 100.0,
      duplicatesPercentage: 0.0,
      missingValuesPercentage: 0.0,
      invalidValuesPercentage: 0.0,
      consistencyScore: 100.0,
      freshnessStatus: 'Fresh',
      spatialIntegrity: 100.0
    }
  },
  {
    id: 'ds-ofc-03',
    title: 'State Industrial Corridor & Freight Network Vectors',
    source: 'MIDC & Public Works Department',
    category: 'Infrastructure',
    coverage: 'Industrial Belts',
    records: 142,
    lastUpdated: '01 Jan 2026',
    version: 'v1.8',
    qualityScore: 92,
    status: 'Under Review',
    verificationStatus: 'PROTOTYPE_DERIVED',
    format: 'GeoJSON LineString',
    license: 'Departmental Internal',
    description: 'Spatial vector lines representing major industrial corridors, expressways, and freight logistics routes.',
    schema: [
      { column: 'corridor_id', dataType: 'String', nullable: false, description: 'Unique Corridor Identifier' },
      { column: 'corridor_name', dataType: 'String', nullable: false, description: 'Official name of the road / freight axis' },
      { column: 'length_km', dataType: 'Float', nullable: false, description: 'Total spatial line length in kilometers' },
      { column: 'width_m', dataType: 'Float', nullable: false, description: 'Right of way (ROW) width in meters' }
    ],
    quality: {
      completeness: 94.5,
      duplicatesPercentage: 0.5,
      missingValuesPercentage: 4.8,
      invalidValuesPercentage: 0.2,
      consistencyScore: 92.0,
      freshnessStatus: 'Due Soon',
      spatialIntegrity: 98.2
    }
  },
  {
    id: 'ds-ofc-04',
    title: 'Synthetic Land-Climate Risk Benchmark Matrix (SIH Pilot)',
    source: 'BhoomiDrishti Research & GIS Team',
    category: 'Research Benchmark',
    coverage: 'Selected Pilot Districts',
    records: 6,
    lastUpdated: '25 Sep 2026',
    version: 'v0.9-synth',
    qualityScore: 85,
    status: 'Prototype',
    verificationStatus: 'SYNTHETIC_PROTOTYPE',
    format: 'CSV Payload',
    license: 'SIH Research Prototype',
    description: 'Synthetic parameters combining flood inundation modeling with land acquisition cost matrices for scenario simulation.',
    schema: [
      { column: 'district', dataType: 'String', nullable: false, description: 'Pilot District Name' },
      { column: 'risk_index', dataType: 'Float', nullable: false, description: 'Composite climate vulnerability index score' },
      { column: 'acquisition_cost_crores_ha', dataType: 'Float', nullable: false, description: 'Estimated land compensation cost per hectare' }
    ],
    quality: {
      completeness: 90.0,
      duplicatesPercentage: 0.0,
      missingValuesPercentage: 10.0,
      invalidValuesPercentage: 0.0,
      consistencyScore: 85.0,
      freshnessStatus: 'Fresh',
      spatialIntegrity: 90.0
    }
  }
];

export const MOCK_OFFICER_GIS_LAYERS: GISLayerDetail[] = [
  {
    id: 'lyr-ofc-01',
    name: 'Maharashtra District Boundaries (Census 2025)',
    category: 'BOUNDARIES',
    type: 'Vector Polygon',
    source: 'Survey of India & NRSC Bhuvan',
    crs: 'EPSG:4326 (WGS84)',
    featureCount: 36,
    coverage: 'State-wide (36 Districts)',
    geometryType: 'MultiPolygon',
    lastUpdated: '2025-01-01',
    status: 'Available',
    visibility: 'Public',
    boundingBox: [72.6, 15.6, 80.9, 22.0]
  },
  {
    id: 'lyr-ofc-02',
    name: 'LULC Land Use & Land Cover Grid (10m Resolution)',
    category: 'LAND',
    type: 'Raster Grid',
    source: 'Sentinel-2 Remote Sensing & NRSC',
    crs: 'EPSG:4326 (WGS84)',
    featureCount: 420,
    coverage: 'State-wide',
    geometryType: 'Polygon',
    lastUpdated: '2026-02-15',
    status: 'Available',
    visibility: 'Public',
    boundingBox: [72.6, 15.6, 80.9, 22.0]
  },
  {
    id: 'lyr-ofc-03',
    name: 'IMD Monsoon Season Precipitation Grids',
    category: 'CLIMATE',
    type: 'Raster Grid',
    source: 'India Meteorological Dept (IMD)',
    crs: 'EPSG:4326 (WGS84)',
    featureCount: 36,
    coverage: 'State-wide',
    geometryType: 'Polygon',
    lastUpdated: '2026-02-10',
    status: 'Available',
    visibility: 'Public',
    boundingBox: [72.6, 15.6, 80.9, 22.0]
  },
  {
    id: 'lyr-ofc-04',
    name: 'Estuarine Coastal & River Flood Hazard Zones',
    category: 'ENVIRONMENT',
    type: 'Vector Polygon',
    source: 'Central Water Commission (CWC)',
    crs: 'EPSG:4326 (WGS84)',
    featureCount: 84,
    coverage: 'Konkan Coastal Belt & Godavari Basin',
    geometryType: 'Polygon',
    lastUpdated: '2026-02-01',
    status: 'Under Validation',
    visibility: 'Departmental Only',
    boundingBox: [72.8, 15.8, 74.5, 20.0]
  },
  {
    id: 'lyr-ofc-05',
    name: 'Industrial Corridors & Transport Expressways',
    category: 'INFRASTRUCTURE',
    type: 'Vector Line',
    source: 'MIDC & MSRDC',
    crs: 'EPSG:4326 (WGS84)',
    featureCount: 142,
    coverage: 'State Transportation Axes',
    geometryType: 'LineString',
    lastUpdated: '2025-08-14',
    status: 'Available',
    visibility: 'Public',
    boundingBox: [72.8, 18.0, 79.5, 21.5]
  },
  {
    id: 'lyr-ofc-06',
    name: 'University & Institutional Research Locations',
    category: 'RESEARCH',
    type: 'Point Feature',
    source: 'BhoomiDrishti Academic Network',
    crs: 'EPSG:4326 (WGS84)',
    featureCount: 28,
    coverage: 'Key Academic Centers',
    geometryType: 'Point',
    lastUpdated: '2025-09-12',
    status: 'Available',
    visibility: 'Public',
    boundingBox: [72.8, 18.5, 79.1, 21.2]
  }
];

export const MOCK_OFFICER_CONFLICTS: DataConflictRecord[] = [
  {
    id: 'cnf-001',
    parcelId: 'LP-MH-2026-001',
    location: 'Nagpur Rural Block (Survey No. 142/3)',
    district: 'Nagpur',
    datasetA: 'State Revenue Land Record (7/12 RoR Registry)',
    datasetB: 'Bhuvan GIS High-Resolution Satellite Vector',
    revenueAreaHa: 10.4,
    satelliteAreaHa: 12.1,
    differenceAreaHa: 1.7,
    detectedDate: '2026-02-24',
    severity: 'High',
    status: 'New',
    assignedOfficer: 'Shri Manoj Deshmukh (State Remote Sensing Cell)',
    lat: 21.1458,
    lng: 79.0882,
    description: 'Potential discrepancy detected between legacy revenue paper survey acreage (10.4 ha) and satellite-derived parcel polygon boundary (12.1 ha). Requires authorized review.',
    comments: [
      { user: 'Automated Discrepancy Engine', date: '2026-02-24 14:00', comment: 'Flagged 1.7 ha variance exceeding 5.0% tolerance threshold.' }
    ]
  },
  {
    id: 'cnf-002',
    parcelId: 'LP-MH-2026-003',
    location: 'Raigad Peri-Urban Belt (Plot 88 Industrial)',
    district: 'Raigad',
    datasetA: 'District Zoning Master Plan (Agricultural)',
    datasetB: 'Sentinel-2 LULC Remote Sensing (Built-Up)',
    revenueAreaHa: 45.0,
    satelliteAreaHa: 48.4,
    differenceAreaHa: 3.4,
    detectedDate: '2026-02-20',
    severity: 'Medium',
    status: 'Under Investigation',
    assignedOfficer: 'Priya Sharma (Data & GIS Officer)',
    lat: 18.5158,
    lng: 73.1822,
    description: 'Potential discrepancy detected between master plan zoning classification (Agricultural) and observed satellite built-up footprint (3.4 ha built-up extension). Requires authorized review.',
    comments: [
      { user: 'Priya Sharma', date: '2026-02-21 10:15', comment: 'Requested updated drone survey data from District Collectorate.' }
    ]
  },
  {
    id: 'cnf-003',
    parcelId: 'LP-MH-2026-009',
    location: 'Thane Coastal Fringe (Estuarine Parcel #12)',
    district: 'Thane',
    datasetA: 'State Cadastral Revenue Boundary Vector',
    datasetB: 'CRZ-I Coastal Regulation Zone Polygon',
    revenueAreaHa: 18.2,
    satelliteAreaHa: 19.0,
    differenceAreaHa: 0.8,
    detectedDate: '2026-02-15',
    severity: 'High',
    status: 'Under Investigation',
    assignedOfficer: 'Shri Manoj Deshmukh',
    lat: 19.2183,
    lng: 72.9781,
    description: 'Potential discrepancy detected between private land title boundary and statutory 50m mangrove eco-sensitive buffer line.',
    comments: [
      { user: 'Shri Manoj Deshmukh', date: '2026-02-16 16:30', comment: 'Cross-verifying CRZ notification map with State Coastal Zone Management Authority.' }
    ]
  }
];

export const MOCK_OFFICER_SPATIAL_ANALYSIS_JOBS: SpatialAnalysisJob[] = [
  {
    id: 'job-sp-01',
    title: 'Villages within 5km of Industrial Corridor Axis',
    operation: 'Buffer',
    sourceLayer: 'Industrial Corridors Vector',
    targetLayer: 'Village Settlement Points',
    parameters: 'Distance: 5.0 km, Dissolve: True',
    executedDate: '2026-02-24 16:45',
    outputFeaturesCount: 124,
    status: 'Completed'
  },
  {
    id: 'job-sp-02',
    title: 'High-Flood Risk Overlay with Agricultural Acreage',
    operation: 'Intersect',
    sourceLayer: 'CWC Flood Hazard Polygons',
    targetLayer: 'LULC Agricultural Land',
    parameters: 'Spatial Rel: Intersects',
    executedDate: '2026-02-22 11:20',
    outputFeaturesCount: 48,
    status: 'Completed'
  }
];

export const MOCK_OFFICER_DATA_ACTIVITIES: DataActivityItem[] = [
  {
    id: 'act-001',
    timestamp: '25 Sep 2026, 16:10',
    user: 'Shri Manoj Deshmukh',
    action: 'Validated Geometry',
    datasetOrLayer: 'Maharashtra District Boundaries (Census 2025)',
    details: 'Completed topology check with 100% geometric validity (0 self-intersections).',
    status: 'Success'
  },
  {
    id: 'act-002',
    timestamp: '25 Sep 2026, 14:30',
    user: 'Shri Manoj Deshmukh',
    action: 'Flagged Discrepancy',
    datasetOrLayer: 'Nagpur Rural Parcel #142/3',
    details: 'Logged 1.7 ha boundary variance between Revenue record & Bhuvan GIS satellite vector.',
    status: 'Warning'
  },
  {
    id: 'act-003',
    timestamp: '24 Sep 2026, 11:00',
    user: 'Priya Sharma',
    action: 'Uploaded Dataset',
    datasetOrLayer: 'IMD Operational Monsoon Rainfall v2026.1',
    details: 'Ingested district-wise rainfall CSV payload and executed automated schema validation.',
    status: 'Success'
  }
];
