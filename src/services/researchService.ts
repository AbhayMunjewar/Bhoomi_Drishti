import { MOCK_RESEARCH_PAPERS, MOCK_RESEARCH_DATASETS, MOCK_RESEARCH_PROJECTS } from '../data/mockResearch';
import { ResearchPaper, ResearchDataset, ResearchProject } from '../types/research';
import { apiClient } from '../api/client';

export const researchService = {
  async searchResearch(query: string): Promise<ResearchPaper[]> {
    try {
      return await apiClient<ResearchPaper[]>(`/research/search?q=${encodeURIComponent(query)}`);
    } catch {
      if (!query.trim()) return MOCK_RESEARCH_PAPERS;
      const lower = query.toLowerCase();
      return MOCK_RESEARCH_PAPERS.filter(
        (paper) =>
          paper.title.toLowerCase().includes(lower) ||
          paper.abstract.toLowerCase().includes(lower) ||
          paper.topics.some((t) => t.toLowerCase().includes(lower))
      );
    }
  },

  async getPaperById(id: string): Promise<ResearchPaper | undefined> {
    try {
      return await apiClient<ResearchPaper>(`/research/papers/${id}`);
    } catch {
      return MOCK_RESEARCH_PAPERS.find((p) => p.id === id) || MOCK_RESEARCH_PAPERS[0];
    }
  },

  async getDatasets(): Promise<ResearchDataset[]> {
    try {
      return await apiClient<ResearchDataset[]>('/research/datasets');
    } catch {
      return MOCK_RESEARCH_DATASETS;
    }
  },

  async getProjects(): Promise<ResearchProject[]> {
    try {
      return await apiClient<ResearchProject[]>('/research/projects');
    } catch {
      return MOCK_RESEARCH_PROJECTS;
    }
  }
};
