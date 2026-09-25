export const projectsGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'proj-101',
        title: 'Bhiwandi Freight Corridor Extension',
        department: 'NHAI & Govt of Maharashtra',
        district: 'Thane',
        status: 'Under Implementation',
        budget: '₹450 Cr',
        category: 'Infrastructure'
      },
      geometry: { type: 'Point', coordinates: [73.0809, 19.2183] }
    },
    {
      type: 'Feature',
      properties: {
        id: 'proj-102',
        title: 'Panvel Multi-Modal Housing Zone',
        department: 'CIDCO',
        district: 'Raigad',
        status: 'Planning Phase',
        budget: '₹890 Cr',
        category: 'Urban Housing'
      },
      geometry: { type: 'Point', coordinates: [73.1175, 18.9894] }
    },
    {
      type: 'Feature',
      properties: {
        id: 'proj-103',
        title: 'Haveli Solar Grid Park',
        department: 'MEDA (Maharashtra Energy)',
        district: 'Pune',
        status: 'Completed',
        budget: '₹320 Cr',
        category: 'Renewable Energy'
      },
      geometry: { type: 'Point', coordinates: [73.8567, 18.5204] }
    },
    {
      type: 'Feature',
      properties: {
        id: 'proj-104',
        title: 'Kurla Suburban Smart Drainage Hub',
        department: 'MCGM',
        district: 'Mumbai Suburban',
        status: 'Approved',
        budget: '₹185 Cr',
        category: 'Flood Management'
      },
      geometry: { type: 'Point', coordinates: [72.8777, 19.0760] }
    },
    {
      type: 'Feature',
      properties: {
        id: 'proj-105',
        title: 'Hingna Multi-Modal Logistics Hub',
        department: 'MIDC Nagpur',
        district: 'Nagpur',
        status: 'Under Implementation',
        budget: '₹620 Cr',
        category: 'Industrial Logistics'
      },
      geometry: { type: 'Point', coordinates: [79.0882, 21.1458] }
    }
  ]
};

export const researchLocationsGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'res-loc-01',
        title: 'Urban Land-Use Conversion & Flood Resilience in Coastal Lowlands',
        authors: 'Dr. A. K. Sharma et al. (VJTI)',
        year: 2025,
        type: 'Research Paper',
        district: 'Raigad',
        topic: 'Climate & Land Resilience'
      },
      geometry: { type: 'Point', coordinates: [73.11, 18.99] }
    },
    {
      type: 'Feature',
      properties: {
        id: 'res-loc-02',
        title: 'Digitization of Land Records & Parcel Boundary Conflicts in Peri-Urban Areas',
        authors: 'Prof. R. V. Kulkarni (IIT Bombay)',
        year: 2024,
        type: 'Case Study',
        district: 'Thane',
        topic: 'Land Administration & GIS'
      },
      geometry: { type: 'Point', coordinates: [73.05, 19.25] }
    },
    {
      type: 'Feature',
      properties: {
        id: 'res-loc-03',
        title: 'Agri-Solar Dual Land Use Evaluation in Semi-Arid Deccan Trap',
        authors: 'Dr. S. Patil (VNIT Nagpur)',
        year: 2026,
        type: 'Research Project',
        district: 'Solapur',
        topic: 'Sustainable Land Use'
      },
      geometry: { type: 'Point', coordinates: [75.90, 17.65] }
    },
    {
      type: 'Feature',
      properties: {
        id: 'res-loc-04',
        title: 'Peri-Urban Industrial Land Sprawl Assessment along Freight Corridors',
        authors: 'Nagpur Urban Planning Research Cell',
        year: 2025,
        type: 'Dataset',
        district: 'Nagpur',
        topic: 'Industrial Land Governance'
      },
      geometry: { type: 'Point', coordinates: [79.12, 21.12] }
    }
  ]
};
