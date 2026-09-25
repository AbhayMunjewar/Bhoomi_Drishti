export const statesGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Maharashtra', code: 'MH', riskLevel: 'MODERATE' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [72.8, 18.9], [74.5, 20.0], [77.0, 21.5], [80.5, 21.0],
            [79.8, 19.5], [76.5, 17.5], [73.5, 15.8], [72.8, 18.9]
          ]
        ]
      }
    }
  ]
};

export const districtsGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'dist-01',
        name: 'Nagpur',
        state: 'Maharashtra',
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
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [78.8, 21.0], [79.4, 21.4], [79.6, 21.1], [79.1, 20.8], [78.8, 21.0]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'dist-02',
        name: 'Mumbai Suburban',
        state: 'Maharashtra',
        riskLevel: 'HIGH',
        riskScore: 69.9,
        landUse: 'Urban Built-up & Tech Park',
        areaHa: 1250,
        activeProjects: 28,
        researchCount: 14,
        dataQualityScore: 92,
        climateRainfallMm: 920.0,
        rainfallDeparturePct: 22.7
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [72.8, 19.0], [72.95, 19.25], [73.0, 19.1], [72.85, 18.95], [72.8, 19.0]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'dist-03',
        name: 'Thane',
        state: 'Maharashtra',
        riskLevel: 'MODERATE',
        riskScore: 62.4,
        landUse: 'Warehousing & Logistics',
        areaHa: 2800,
        activeProjects: 18,
        researchCount: 8,
        dataQualityScore: 89,
        climateRainfallMm: 980.2,
        rainfallDeparturePct: 25.7
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [72.95, 19.15], [73.2, 19.4], [73.35, 19.2], [73.05, 19.05], [72.95, 19.15]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'dist-04',
        name: 'Raigad',
        state: 'Maharashtra',
        riskLevel: 'VERY HIGH',
        riskScore: 84.7,
        landUse: 'Coastal Lowland & Residential Township',
        areaHa: 4500,
        activeProjects: 9,
        researchCount: 6,
        dataQualityScore: 86,
        climateRainfallMm: 1250.4,
        rainfallDeparturePct: 31.6
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [72.85, 18.8], [73.2, 18.9], [73.3, 18.4], [72.95, 18.3], [72.85, 18.8]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'dist-05',
        name: 'Pune',
        state: 'Maharashtra',
        riskLevel: 'LOW',
        riskScore: 22.9,
        landUse: 'Renewable Solar & IT Hub',
        areaHa: 6000,
        activeProjects: 34,
        researchCount: 22,
        dataQualityScore: 96,
        climateRainfallMm: 520.4,
        rainfallDeparturePct: 8.4
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [73.5, 18.4], [74.1, 18.8], [74.3, 18.2], [73.7, 18.1], [73.5, 18.4]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'dist-06',
        name: 'Solapur',
        state: 'Maharashtra',
        riskLevel: 'LOW',
        riskScore: 15.0,
        landUse: 'Agri-Processing & Semi-Arid Belt',
        areaHa: 3500,
        activeProjects: 7,
        researchCount: 4,
        dataQualityScore: 91,
        climateRainfallMm: 280.5,
        rainfallDeparturePct: -15.0
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [75.4, 17.4], [76.1, 17.9], [76.3, 17.3], [75.6, 17.1], [75.4, 17.4]
          ]
        ]
      }
    }
  ]
};
