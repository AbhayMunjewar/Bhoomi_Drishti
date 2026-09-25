import { MOCK_DISTRICT_KPI, MOCK_RISK_BREAKDOWN, MOCK_EVIDENCE_CARDS, MOCK_DATA_CONFLICTS, MOCK_AUDIT_TRAIL } from '../data/mockGovernment';
import { DistrictKPI, RiskFactorBreakdown, EvidenceCardData, DataConflictItem, AuditTrailEvent } from '../types/government';
import { apiClient } from '../api/client';

export const governmentService = {
  async getDistrictKPI(districtName: string): Promise<DistrictKPI> {
    try {
      return await apiClient<DistrictKPI>(`/government/district/${districtName}/kpi`);
    } catch {
      return MOCK_DISTRICT_KPI;
    }
  },

  async getRiskBreakdown(districtName: string): Promise<RiskFactorBreakdown> {
    try {
      return await apiClient<RiskFactorBreakdown>(`/government/district/${districtName}/risk-breakdown`);
    } catch {
      return MOCK_RISK_BREAKDOWN;
    }
  },

  async getEvidenceCards(): Promise<EvidenceCardData[]> {
    try {
      return await apiClient<EvidenceCardData[]>('/government/evidence-cards');
    } catch {
      return MOCK_EVIDENCE_CARDS;
    }
  },

  async getDataConflicts(): Promise<DataConflictItem[]> {
    try {
      return await apiClient<DataConflictItem[]>('/government/data-conflicts');
    } catch {
      return MOCK_DATA_CONFLICTS;
    }
  },

  async getAuditTrail(): Promise<AuditTrailEvent[]> {
    try {
      return await apiClient<AuditTrailEvent[]>('/government/audit-trail');
    } catch {
      return MOCK_AUDIT_TRAIL;
    }
  }
};
