import { create } from 'zustand';
import { PolicySimulationParams, ScenarioMetrics } from '../types/policy';
import { MOCK_SCENARIOS } from '../data/mockPolicy';

interface PolicyStore {
  params: PolicySimulationParams;
  activeScenario: 'Scenario A' | 'Scenario B' | 'Scenario C';
  setParams: (params: Partial<PolicySimulationParams>) => void;
  setActiveScenario: (scenario: 'Scenario A' | 'Scenario B' | 'Scenario C') => void;
  getScenarioData: () => ScenarioMetrics;
}

export const usePolicyStore = create<PolicyStore>((set, get) => ({
  params: {
    policyType: 'Land-use conversion regulation',
    state: 'Maharashtra',
    district: 'Nagpur',
    timeHorizonYears: 5,
    urbanExpansionPct: 28,
    infrastructureInvestmentCr: 500,
    conservationFocusPct: 60
  },
  activeScenario: 'Scenario A',

  setParams: (newParams) =>
    set((state) => ({ params: { ...state.params, ...newParams } })),

  setActiveScenario: (scenario) => set({ activeScenario: scenario }),

  getScenarioData: () => {
    const active = get().activeScenario;
    return MOCK_SCENARIOS[active] || MOCK_SCENARIOS['Scenario A'];
  }
}));
