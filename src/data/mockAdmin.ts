export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'DATA_GIS_OFFICER' | 'RESEARCHER' | 'POLICY_PLANNING_OFFICER' | 'INSTITUTION_USER' | 'PUBLIC';
  roleLabel: string;
  institution: string;
  status: 'Active' | 'Pending Approval' | 'Deactivated' | 'Suspended';
  lastActive: string;
  createdDate: string;
  phone?: string;
  department?: string;
  permissionsCount: number;
}

export interface AdminInstitution {
  id: string;
  name: string;
  type: 'University' | 'Research Institute' | 'Government Department' | 'Think Tank' | 'NGO' | 'Other Approved Organization';
  state: string;
  researchersCount: number;
  projectsCount: number;
  publicationsCount: number;
  datasetsCount: number;
  status: 'Active' | 'Pending Verification' | 'Suspended';
  verifiedDate?: string;
  contactEmail: string;
  leadPerson: string;
}

export interface AdminApproval {
  id: string;
  title: string;
  submittedBy: string;
  submitterRole: string;
  institution: string;
  type: 'User Account' | 'Research Paper' | 'Dataset' | 'GIS Layer' | 'Institution Verification' | 'Public Report';
  submittedDate: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Needs Changes';
  reviewer?: string;
  metadata: Record<string, string>;
  validationStatus: 'Passed' | 'Warnings' | 'Requires Review';
}

export interface AdminDatasetItem {
  id: string;
  title: string;
  publisher: string;
  category: string;
  coverage: string;
  lastUpdated: string;
  version: string;
  status: 'Published' | 'Pending Validation' | 'Outdated' | 'Restricted';
  verificationStatus: 'OFFICIAL_SOURCE' | 'PROTOTYPE_DERIVED' | 'SYNTHETIC_PROTOTYPE';
  recordCount: number;
  fileFormat: string;
  qualityScore: number;
}

export interface AdminGISLayerItem {
  id: string;
  name: string;
  type: 'Vector Polygon' | 'Vector Line' | 'Raster Grid' | 'Point Feature';
  source: string;
  coverage: string;
  geometryType: 'Polygon' | 'MultiPolygon' | 'LineString' | 'Point';
  status: 'Published' | 'Restricted' | 'Pending' | 'Invalid';
  lastUpdated: string;
  visibility: 'Public' | 'Departmental Only' | 'Admin Only';
  featureCount: number;
}

export interface AdminDataConflict {
  id: string;
  datasetA: string;
  datasetB: string;
  location: string;
  district: string;
  differenceAreaHa: number;
  detectedDate: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'New' | 'Under Review' | 'Resolved' | 'Dismissed';
  assignedTo?: string;
  description: string;
  parcelId: string;
  revenueAreaHa: number;
  satelliteAreaHa: number;
  lat: number;
  lng: number;
}

export interface AdminIntegrationItem {
  id: string;
  serviceName: string;
  category: 'Weather / Climate' | 'Satellite GIS' | 'Open Government Data' | 'Spatial Database' | 'AI / Vector DB';
  status: 'Connected' | 'Cached / Fallback' | 'Restricted' | 'Degraded';
  lastSync: string;
  lastAttempt: string;
  responseTimeMs: number;
  authStatus: 'Authenticated' | 'API Key Valid' | 'IP Whitelist Required';
  fallbackMode: string;
}

export interface AdminSystemHealthItem {
  id: string;
  component: string;
  category: 'Frontend' | 'Backend API' | 'Database' | 'GIS Engine' | 'AI / Vector Search' | 'Storage' | 'External APIs';
  status: 'Healthy' | 'Degraded' | 'Unavailable';
  responseTimeMs: number;
  lastChecked: string;
  uptimePercentage: number;
  lastError?: string;
}

export interface AdminAuditEvent {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  resource: string;
  resourceId: string;
  ipAddress: string;
  status: 'Success' | 'Failure' | 'Warning';
  details?: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'User' | 'Dataset' | 'GIS' | 'System' | 'Research';
  time: string;
  read: boolean;
  link: string;
}

// -------------------------------------------------------------
// INITIAL MOCK BACKEND DATA FOR SYSTEM ADMINISTRATION
// -------------------------------------------------------------

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-001',
    name: 'Abhay Kulkarni',
    email: 'admin.sih@bhoomidrishti.gov.in',
    role: 'ADMIN',
    roleLabel: 'System Administrator',
    institution: 'National Land Intelligence Data Center',
    status: 'Active',
    lastActive: 'Just now',
    createdDate: '2025-08-01',
    phone: '+91 98230 11223',
    department: 'System Architecture & Infrastructure',
    permissionsCount: 48
  },
  {
    id: 'usr-002',
    name: 'Dr. Vikramaditya Joshi',
    email: 'v.joshi@vjti.ac.in',
    role: 'RESEARCHER',
    roleLabel: 'Researcher',
    institution: 'Veermata Jijabai Technological Institute (VJTI)',
    status: 'Active',
    lastActive: '2 hours ago',
    createdDate: '2025-09-10',
    phone: '+91 98450 44332',
    department: 'Geoinformatics Research Lab',
    permissionsCount: 16
  },
  {
    id: 'usr-003',
    name: 'Sanjay Deshmukh',
    email: 's.deshmukh@maharashtra.gov.in',
    role: 'POLICY_PLANNING_OFFICER',
    roleLabel: 'Policy & Planning Officer',
    institution: 'Department of Revenue & Land Records, Govt. of MH',
    status: 'Active',
    lastActive: '15 mins ago',
    createdDate: '2025-08-15',
    phone: '+91 94220 99881',
    department: 'State Land Policy Planning Cell',
    permissionsCount: 28
  },
  {
    id: 'usr-004',
    name: 'Priya Sharma',
    email: 'priya.gis@bhuvan.nrsc.gov.in',
    role: 'DATA_GIS_OFFICER',
    roleLabel: 'Data & GIS Officer',
    institution: 'National Remote Sensing Centre (NRSC / Bhuvan)',
    status: 'Active',
    lastActive: '1 day ago',
    createdDate: '2025-09-01',
    phone: '+91 97110 55443',
    department: 'Spatial Data Vector Division',
    permissionsCount: 34
  },
  {
    id: 'usr-005',
    name: 'Prof. R. V. Kulkarni',
    email: 'rvk@iitb.ac.in',
    role: 'INSTITUTION_USER',
    roleLabel: 'Institutional User',
    institution: 'IIT Bombay GIS & Spatial Data Cell',
    status: 'Active',
    lastActive: '3 hours ago',
    createdDate: '2025-09-12',
    phone: '+91 98210 66778',
    department: 'Department of Civil Engineering & GIS',
    permissionsCount: 22
  },
  {
    id: 'usr-006',
    name: 'Aniket Shinde',
    email: 'aniket.shinde@research.org',
    role: 'RESEARCHER',
    roleLabel: 'Researcher',
    institution: 'National Institute of Urban Affairs',
    status: 'Pending Approval',
    lastActive: 'Never',
    createdDate: '2026-02-24',
    phone: '+91 99300 22114',
    department: 'Urban Land Governance Cell',
    permissionsCount: 12
  }
];

export const MOCK_ADMIN_INSTITUTIONS: AdminInstitution[] = [
  {
    id: 'inst-01',
    name: 'Veermata Jijabai Technological Institute (VJTI)',
    type: 'University',
    state: 'Maharashtra',
    researchersCount: 14,
    projectsCount: 4,
    publicationsCount: 18,
    datasetsCount: 6,
    status: 'Active',
    verifiedDate: '2025-08-10',
    contactEmail: 'contact@vjti.ac.in',
    leadPerson: 'Dr. Vikramaditya Joshi'
  },
  {
    id: 'inst-02',
    name: 'IIT Bombay GIS & Spatial Data Cell',
    type: 'Research Institute',
    state: 'Maharashtra',
    researchersCount: 22,
    projectsCount: 8,
    publicationsCount: 34,
    datasetsCount: 12,
    status: 'Active',
    verifiedDate: '2025-08-12',
    contactEmail: 'gis.cell@iitb.ac.in',
    leadPerson: 'Prof. R. V. Kulkarni'
  },
  {
    id: 'inst-03',
    name: 'Department of Revenue & Land Records, Govt. of MH',
    type: 'Government Department',
    state: 'Maharashtra',
    researchersCount: 8,
    projectsCount: 12,
    publicationsCount: 6,
    datasetsCount: 24,
    status: 'Active',
    verifiedDate: '2025-08-01',
    contactEmail: 'revenue.sec@maharashtra.gov.in',
    leadPerson: 'Sanjay Deshmukh'
  },
  {
    id: 'inst-04',
    name: 'Marathwada Agricultural University (VNMKV)',
    type: 'University',
    state: 'Maharashtra',
    researchersCount: 9,
    projectsCount: 3,
    publicationsCount: 11,
    datasetsCount: 4,
    status: 'Pending Verification',
    contactEmail: 'registrar@vnmkv.ac.in',
    leadPerson: 'Dr. Pravin Shinde'
  }
];

export const MOCK_ADMIN_APPROVALS: AdminApproval[] = [
  {
    id: 'app-101',
    title: 'New Researcher Registration: Aniket Shinde',
    submittedBy: 'Aniket Shinde',
    submitterRole: 'Researcher',
    institution: 'National Institute of Urban Affairs',
    type: 'User Account',
    submittedDate: '2026-02-24 14:30',
    status: 'Pending',
    metadata: {
      Email: 'aniket.shinde@research.org',
      Role: 'Researcher',
      Department: 'Urban Land Governance Cell'
    },
    validationStatus: 'Passed'
  },
  {
    id: 'app-102',
    title: 'Research Publication: Peri-Urban Coastal Flood Inundation Model',
    submittedBy: 'Dr. Vikramaditya Joshi',
    submitterRole: 'Researcher',
    institution: 'VJTI Mumbai',
    type: 'Research Paper',
    submittedDate: '2026-02-22 11:15',
    status: 'Under Review',
    reviewer: 'System Administrator',
    metadata: {
      Title: 'Geospatial Evaluation of Peri-Urban Land Use Conversion',
      DOI: '10.1016/j.landuse.2025.109281',
      Topic: 'Land Use & Flood Resilience'
    },
    validationStatus: 'Passed'
  },
  {
    id: 'app-103',
    title: 'District Cadastral Boundary Vector Upload (Phase 3)',
    submittedBy: 'Priya Sharma',
    submitterRole: 'Data & GIS Officer',
    institution: 'NRSC / Bhuvan',
    type: 'GIS Layer',
    submittedDate: '2026-02-20 09:45',
    status: 'Pending',
    metadata: {
      Format: 'GeoJSON Vector',
      Features: '12,400 Polygons',
      CRS: 'EPSG:4326 (WGS84)'
    },
    validationStatus: 'Warnings'
  }
];

export const MOCK_ADMIN_DATASETS: AdminDatasetItem[] = [
  {
    id: 'ds-adm-01',
    title: 'Maharashtra District Land Use & LULC Acreage Vector',
    publisher: 'NRSC Bhuvan & State Revenue Dept',
    category: 'LULC',
    coverage: 'State-wide (36 Districts)',
    lastUpdated: '15 Jan 2026',
    version: 'v2.4',
    status: 'Published',
    verificationStatus: 'OFFICIAL_SOURCE',
    recordCount: 36,
    fileFormat: 'GeoJSON',
    qualityScore: 98
  },
  {
    id: 'ds-adm-02',
    title: 'IMD Operational District Monsoon Rainfall & SPI Matrix',
    publisher: 'India Meteorological Department (IMD)',
    category: 'Rainfall',
    coverage: 'District-level MH',
    lastUpdated: '10 Feb 2026',
    version: 'v2026.1',
    status: 'Published',
    verificationStatus: 'OFFICIAL_SOURCE',
    recordCount: 36,
    fileFormat: 'GeoJSON / CSV',
    qualityScore: 99
  },
  {
    id: 'ds-adm-03',
    title: 'Public Infrastructure & Industrial Corridor GIS Vectors',
    publisher: 'MIDC & PWD Spatial Data Cell',
    category: 'Infrastructure',
    coverage: 'State Infrastructure Network',
    lastUpdated: '01 Jan 2026',
    version: 'v1.8',
    status: 'Published',
    verificationStatus: 'PROTOTYPE_DERIVED',
    recordCount: 142,
    fileFormat: 'GeoJSON',
    qualityScore: 92
  },
  {
    id: 'ds-adm-04',
    title: 'Synthetic Land-Climate Risk Benchmark Matrix (SIH Pilot)',
    publisher: 'BhoomiDrishti AI & Spatial Team',
    category: 'Research Benchmark',
    coverage: 'Selected Pilot Districts',
    lastUpdated: '25 Sep 2026',
    version: 'v0.9-synth',
    status: 'Published',
    verificationStatus: 'SYNTHETIC_PROTOTYPE',
    recordCount: 6,
    fileFormat: 'CSV',
    qualityScore: 85
  }
];

export const MOCK_ADMIN_GIS_LAYERS: AdminGISLayerItem[] = [
  {
    id: 'lyr-01',
    name: 'District Administrative Boundaries (2025)',
    type: 'Vector Polygon',
    source: 'Survey of India / Census',
    coverage: 'Maharashtra (36 Districts)',
    geometryType: 'MultiPolygon',
    status: 'Published',
    lastUpdated: '2025-01-01',
    visibility: 'Public',
    featureCount: 36
  },
  {
    id: 'lyr-02',
    name: 'IMD Monsoon Rainfall Departure Grid (0.25 deg)',
    type: 'Raster Grid',
    source: 'India Meteorological Dept (IMD)',
    coverage: 'State-wide',
    geometryType: 'Polygon',
    status: 'Published',
    lastUpdated: '2026-02-10',
    visibility: 'Public',
    featureCount: 420
  },
  {
    id: 'lyr-03',
    name: 'State Highway & Freight Corridor Vectors',
    type: 'Vector Line',
    source: 'Public Works Dept (PWD)',
    coverage: 'State-wide Corridors',
    geometryType: 'LineString',
    status: 'Published',
    lastUpdated: '2025-08-14',
    visibility: 'Public',
    featureCount: 148
  },
  {
    id: 'lyr-04',
    name: 'Restricted Government Land Acquisition Zones (Draft)',
    type: 'Vector Polygon',
    source: 'State Revenue Department',
    coverage: 'Peri-Urban Industrial Belts',
    geometryType: 'Polygon',
    status: 'Restricted',
    lastUpdated: '2026-02-01',
    visibility: 'Admin Only',
    featureCount: 24
  }
];

export const MOCK_ADMIN_DATA_CONFLICTS: AdminDataConflict[] = [
  {
    id: 'cnf-001',
    datasetA: 'State Revenue RoR Text Registry (7/12)',
    datasetB: 'High-Res WorldView-3 Satellite Vector',
    location: 'Nagpur Rural Block (Parcels #104 - #112)',
    district: 'Nagpur',
    differenceAreaHa: 1.7,
    detectedDate: '2026-02-22',
    severity: 'High',
    status: 'New',
    description: 'Potential discrepancy detected between legacy paper survey acreage (10.4 ha) and satellite boundary vector (12.1 ha). Requires authorized review.',
    parcelId: 'LP-MH-2026-001',
    revenueAreaHa: 10.4,
    satelliteAreaHa: 12.1,
    lat: 21.1458,
    lng: 79.0882
  },
  {
    id: 'cnf-002',
    datasetA: 'MIDC Industrial Zone Boundary Master Plan',
    datasetB: 'Estuarine Coastal Flood Buffer Polygon',
    location: 'Raigad Peri-Urban Corridor',
    district: 'Raigad',
    differenceAreaHa: 3.4,
    detectedDate: '2026-02-18',
    severity: 'Medium',
    status: 'Under Review',
    assignedTo: 'Priya Sharma (Data & GIS Officer)',
    description: 'Potential discrepancy detected between industrial layout boundary and estuarine flood hazard line (3.4 ha overlap). Requires authorized review.',
    parcelId: 'LP-MH-2026-003',
    revenueAreaHa: 45.0,
    satelliteAreaHa: 48.4,
    lat: 18.5158,
    lng: 73.1822
  }
];

export const MOCK_ADMIN_INTEGRATIONS: AdminIntegrationItem[] = [
  {
    id: 'int-01',
    serviceName: 'IMD Rainfall & Climatology Feed',
    category: 'Weather / Climate',
    status: 'Restricted',
    lastSync: '2026-02-10 08:00',
    lastAttempt: '2026-02-25 10:00',
    responseTimeMs: 340,
    authStatus: 'IP Whitelist Required',
    fallbackMode: 'Fallback: Latest cached operational dataset (2026-02-10)'
  },
  {
    id: 'int-02',
    serviceName: 'NRSC Bhuvan Spatial Vector Catalogue',
    category: 'Satellite GIS',
    status: 'Connected',
    lastSync: '2026-02-25 04:30',
    lastAttempt: '2026-02-25 04:30',
    responseTimeMs: 120,
    authStatus: 'Authenticated',
    fallbackMode: 'Direct WMS/WFS Live Vector Endpoint'
  },
  {
    id: 'int-03',
    serviceName: 'PostGIS Spatial Relational Database',
    category: 'Spatial Database',
    status: 'Connected',
    lastSync: 'Real-time',
    lastAttempt: 'Real-time',
    responseTimeMs: 14,
    authStatus: 'Authenticated',
    fallbackMode: 'Primary PostgreSQL / PostGIS 15 Cluster'
  },
  {
    id: 'int-04',
    serviceName: 'BhoomiDrishti AI & RAG Vector Search Engine',
    category: 'AI / Vector DB',
    status: 'Connected',
    lastSync: 'Real-time',
    lastAttempt: 'Real-time',
    responseTimeMs: 45,
    authStatus: 'API Key Valid',
    fallbackMode: 'Hybrid Dense Vector + Keyword BM25 Search'
  }
];

export const MOCK_ADMIN_SYSTEM_HEALTH: AdminSystemHealthItem[] = [
  { id: 'h-01', component: 'Frontend Single Page Application', category: 'Frontend', status: 'Healthy', responseTimeMs: 12, lastChecked: 'Just now', uptimePercentage: 99.98 },
  { id: 'h-02', component: 'BhoomiDrishti Core REST Gateway', category: 'Backend API', status: 'Healthy', responseTimeMs: 28, lastChecked: 'Just now', uptimePercentage: 99.95 },
  { id: 'h-03', component: 'PostgreSQL / PostGIS Database Cluster', category: 'Database', status: 'Healthy', responseTimeMs: 14, lastChecked: 'Just now', uptimePercentage: 99.99 },
  { id: 'h-04', component: 'MapLibre Vector Tile Map Server', category: 'GIS Engine', status: 'Healthy', responseTimeMs: 32, lastChecked: 'Just now', uptimePercentage: 99.90 },
  { id: 'h-05', component: 'ChromaDB AI Embeddings Vector Search', category: 'AI / Vector Search', status: 'Healthy', responseTimeMs: 45, lastChecked: 'Just now', uptimePercentage: 99.85 },
  { id: 'h-06', component: 'MinIO S3 Spatial Blob Storage', category: 'Storage', status: 'Healthy', responseTimeMs: 19, lastChecked: 'Just now', uptimePercentage: 99.99 },
  { id: 'h-07', component: 'IMD Operational Climate API Connector', category: 'External APIs', status: 'Degraded', responseTimeMs: 340, lastChecked: '5 mins ago', uptimePercentage: 94.20, lastError: 'Direct API whitelist pending; serving operational cached snapshot.' }
];

export const MOCK_ADMIN_AUDIT_LOGS: AdminAuditEvent[] = [
  {
    id: 'aud-901',
    timestamp: '25 Sep 2026, 15:45:12',
    user: 'Abhay Kulkarni',
    role: 'System Administrator',
    action: 'Approved User Account',
    resource: 'Researcher (Aniket Shinde)',
    resourceId: 'usr-006',
    ipAddress: '192.168.1.10',
    status: 'Success',
    details: 'Verified NIUA institutional affiliation and activated researcher permissions.'
  },
  {
    id: 'aud-902',
    timestamp: '25 Sep 2026, 14:12:05',
    user: 'Priya Sharma',
    role: 'Data & GIS Officer',
    action: 'Validated Dataset',
    resource: 'District Boundaries Vector v2.4',
    resourceId: 'ds-adm-01',
    ipAddress: '10.20.4.15',
    status: 'Success',
    details: 'Completed spatial topology check with 0 overlapping geometries.'
  },
  {
    id: 'aud-903',
    timestamp: '25 Sep 2026, 11:30:00',
    user: 'Sanjay Deshmukh',
    role: 'Policy & Planning Officer',
    action: 'Created Policy Scenario',
    resource: 'Raigad Estuarine Buffer Simulation',
    resourceId: 'scn-402',
    ipAddress: '10.14.8.99',
    status: 'Success',
    details: 'Evaluated 50m statutory drainage buffer impact on non-agricultural clearances.'
  },
  {
    id: 'aud-904',
    timestamp: '25 Sep 2026, 09:15:30',
    user: 'Dr. Vikramaditya Joshi',
    role: 'Researcher',
    action: 'Submitted Research Paper',
    resource: 'Geospatial Evaluation Study',
    resourceId: 'res-pub-01',
    ipAddress: '172.16.2.40',
    status: 'Success',
    details: 'Submitted paper for public research portal indexing.'
  }
];

export const MOCK_ADMIN_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-01',
    title: 'New Researcher Account Pending',
    message: 'Aniket Shinde (NIUA) registered as a Researcher and is awaiting admin approval.',
    type: 'User',
    time: '10 mins ago',
    read: false,
    link: '/admin/approvals/app-101'
  },
  {
    id: 'notif-02',
    title: 'Spatial Data Discrepancy Flagged',
    message: 'Nagpur Rural Block: 1.7 ha parcel boundary mismatch detected between Revenue RoR & Satellite vector.',
    type: 'GIS',
    time: '2 hours ago',
    read: false,
    link: '/admin/data-conflicts/cnf-001'
  },
  {
    id: 'notif-03',
    title: 'IMD API Connector Notice',
    message: 'Direct IMD API whitelist pending; serving operational cached snapshot.',
    type: 'System',
    time: '4 hours ago',
    read: false,
    link: '/admin/integrations'
  }
];
