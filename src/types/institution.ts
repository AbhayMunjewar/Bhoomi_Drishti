export interface InstitutionProfile {
  id: string;
  name: string;
  code: string;
  type: 'University' | 'Research Institute' | 'Think Tank' | 'Government R&D';
  city: string;
  state: string;
  researchersCount: number;
  projectsCount: number;
  publicationsCount: number;
  datasetsCount: number;
}

export interface InstitutionResearcher {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  activeProjects: number;
  publications: number;
}
