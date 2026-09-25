import { MOCK_SCENARIOS, MOCK_POLICY_DOCUMENTS } from '../data/mockPolicy';
import { ScenarioMetrics, PolicyDocument, PolicySimulationParams } from '../types/policy';
import { apiClient } from '../api/client';

export const policyService = {
  async runSimulation(params: PolicySimulationParams): Promise<Record<string, ScenarioMetrics>> {
    try {
      return await apiClient<Record<string, ScenarioMetrics>>('/policy/simulate', {
        method: 'POST',
        body: JSON.stringify(params)
      });
    } catch {
      return MOCK_SCENARIOS;
    }
  },

  async getPolicyDocuments(): Promise<PolicyDocument[]> {
    try {
      return await apiClient<PolicyDocument[]>('/policy/documents');
    } catch {
      return MOCK_POLICY_DOCUMENTS;
    }
  }
};
