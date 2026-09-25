export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  publisherOrSource: string;
  doi?: string;
  topics: string[];
  geographicRelevance: {
    state: string;
    districts: string[];
    lat?: number;
    lng?: number;
  };
  abstract: string;
  keyFindings: string[];
  methodology: string;
  datasetName?: string;
  policyRelevance: string;
  isPublic: boolean;
  status: 'Published' | 'Under Review' | 'Draft';
  relevanceScore?: number;
}

export interface ResearchDataset {
  id: string;
  title: string;
  organization: string;
  format: 'GeoJSON' | 'CSV' | 'GeoTIFF' | 'NetCDF';
  recordsCount: number;
  lastUpdated: string;
  isPublic: boolean;
  topic: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  leadInstitution: string;
  principalInvestigator: string;
  budget: string;
  status: 'Active' | 'Completed' | 'Proposed';
  district: string;
  researchersCount: number;
}
