export const scenarioAGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Nagpur East Sector',
        scenario: 'Scenario A - Current Policy',
        impactLevel: 'High Impact',
        impactScore: 78,
        affectedAreaHa: 2341,
        populationAffectedLakhs: 1.2,
        keyFactors: 'Unregulated Peri-urban Expansion, High Drainage Stress',
        color: '#A33A32'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[79.0, 21.1], [79.2, 21.2], [79.3, 21.0], [79.05, 20.95], [79.0, 21.1]]
        ]
      }
    }
  ]
};

export const scenarioBGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Nagpur East Sector',
        scenario: 'Scenario B - Proposed Policy',
        impactLevel: 'Medium Impact',
        impactScore: 48,
        affectedAreaHa: 1420,
        populationAffectedLakhs: 0.7,
        keyFactors: 'Mandatory 50m Stormwater Buffer, Controlled Zoning',
        color: '#C98A18'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[79.0, 21.1], [79.2, 21.2], [79.3, 21.0], [79.05, 20.95], [79.0, 21.1]]
        ]
      }
    }
  ]
};

export const scenarioCGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Nagpur East Sector',
        scenario: 'Scenario C - Alternative Policy',
        impactLevel: 'Low Impact',
        impactScore: 24,
        affectedAreaHa: 680,
        populationAffectedLakhs: 0.3,
        keyFactors: 'Strict Agricultural Protection Zone, Eco-Corridor Mandate',
        color: '#2E6B45'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[79.0, 21.1], [79.2, 21.2], [79.3, 21.0], [79.05, 20.95], [79.0, 21.1]]
        ]
      }
    }
  ]
};
