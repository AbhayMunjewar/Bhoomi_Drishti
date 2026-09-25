import { create } from 'zustand';
import { RegionFeatureProperties } from '../types/gis';

interface MapStore {
  selectedRegion: RegionFeatureProperties | null;
  activeLayers: string[];
  selectedDistrict: string;
  selectedState: string;
  setSelectedRegion: (region: RegionFeatureProperties | null) => void;
  toggleLayer: (layerId: string) => void;
  setSelectedDistrict: (district: string) => void;
  setSelectedState: (state: string) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  selectedRegion: {
    id: 'dist-01',
    name: 'Nagpur',
    state: 'Maharashtra',
    district: 'Nagpur',
    riskLevel: 'LOW',
    riskScore: 28.3,
    landUse: 'Industrial Freight & Agriculture',
    areaHa: 5000,
    activeProjects: 12,
    researchCount: 5,
    dataQualityScore: 94,
    climateRainfallMm: 620.0,
    rainfallDeparturePct: 12.7
  },
  activeLayers: ['District Boundary', 'Agricultural Land', 'Urban Area', 'Projects', 'Risk Zones', 'Research Locations'],
  selectedDistrict: 'Nagpur',
  selectedState: 'Maharashtra',

  setSelectedRegion: (region) => set({ selectedRegion: region }),
  
  toggleLayer: (layerId) =>
    set((state) => ({
      activeLayers: state.activeLayers.includes(layerId)
        ? state.activeLayers.filter((l) => l !== layerId)
        : [...state.activeLayers, layerId]
    })),

  setSelectedDistrict: (district) => set({ selectedDistrict: district }),
  setSelectedState: (state) => set({ selectedState: state })
}));
