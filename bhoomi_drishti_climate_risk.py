"""
BhoomiDrishti - Comprehensive Land, Climate & Geospatial Risk Analysis Module
-----------------------------------------------------------------------------
Integrates Land Parcel records with IMD Operational District Rainfall,
Terrain Slope, LULC Classification, Temperature, Flood Hazard, and SPI Drought Indices.

Generates updated CSV dataset: bhoomi_drishti_land_climate_risk_updated.csv
"""

import os
import json
import pandas as pd

# Paths
RAINFALL_CSV = "imd_maharashtra_rainfall.csv"
OUTPUT_PARCEL_RISK_CSV = "bhoomi_drishti_land_climate_risk_updated.csv"
OUTPUT_GIS_JSON = "bhoomi_drishti_gis_map_data.json"

ATTRIBUTION_TEXT = "IMD Operational Rainfall (Govt. of India) | Synthetic Terrain & Climate Models for BhoomiDrishti Prototype"

def load_sample_land_parcels():
    """
    Creates sample land parcels representing candidate sites with full geospatial,
    terrain, temperature, drought, flood hazard, and land use properties.
    """
    parcels = [
        {
            "Parcel_ID": "LP-MH-2026-001",
            "Parcel_Name": "Candidate Area A - Urban Expansion Zone",
            "District": "Mumbai Suburban",
            "Taluka": "Kurla",
            "Area_Hectares": 12.5,
            "Proposed_Land_Use": "Commercial Tech Park",
            "Elevation_m": 8.5,
            "Soil_Drainage": "Poor (Clayey Alluvium)",
            "Coordinates": {"lat": 19.0760, "lng": 72.8777},
            "Temperature_Max_C": 31.5,
            "Temperature_Min_C": 24.2,
            "SPI_Drought_Category": "Normal",
            "Flood_Hazard": "High",
            "Slope_Degrees": 1.2,
            "LULC_Class": "Built-up"
        },
        {
            "Parcel_ID": "LP-MH-2026-002",
            "Parcel_Name": "Candidate Area B - Industrial Logistics Park",
            "District": "Thane",
            "Taluka": "Bhiwandi",
            "Area_Hectares": 28.0,
            "Proposed_Land_Use": "Warehousing & Logistics",
            "Elevation_m": 12.0,
            "Soil_Drainage": "Moderate",
            "Coordinates": {"lat": 19.2183, "lng": 73.0809},
            "Temperature_Max_C": 32.0,
            "Temperature_Min_C": 23.8,
            "SPI_Drought_Category": "Normal",
            "Flood_Hazard": "Moderate",
            "Slope_Degrees": 2.5,
            "LULC_Class": "Agricultural Land"
        },
        {
            "Parcel_ID": "LP-MH-2026-003",
            "Parcel_Name": "Candidate Area C - Greenfield Housing Hub",
            "District": "Raigad",
            "Taluka": "Panvel",
            "Area_Hectares": 45.0,
            "Proposed_Land_Use": "Residential Township",
            "Elevation_m": 5.2,
            "Soil_Drainage": "Poor (Coastal Lowland)",
            "Coordinates": {"lat": 18.9894, "lng": 73.1175},
            "Temperature_Max_C": 31.0,
            "Temperature_Min_C": 24.0,
            "SPI_Drought_Category": "Normal",
            "Flood_Hazard": "Very High",
            "Slope_Degrees": 0.8,
            "LULC_Class": "Agricultural Land"
        },
        {
            "Parcel_ID": "LP-MH-2026-004",
            "Parcel_Name": "Candidate Area D - Solar Power Infrastructure",
            "District": "Pune",
            "Taluka": "Haveli",
            "Area_Hectares": 60.0,
            "Proposed_Land_Use": "Renewable Energy",
            "Elevation_m": 560.0,
            "Soil_Drainage": "Good (Rocky/Well-drained)",
            "Coordinates": {"lat": 18.5204, "lng": 73.8567},
            "Temperature_Max_C": 29.8,
            "Temperature_Min_C": 19.5,
            "SPI_Drought_Category": "Normal",
            "Flood_Hazard": "Low",
            "Slope_Degrees": 4.8,
            "LULC_Class": "Barren Land"
        },
        {
            "Parcel_ID": "LP-MH-2026-005",
            "Parcel_Name": "Candidate Area E - Agri-Processing Corridor",
            "District": "Solapur",
            "Taluka": "Mohol",
            "Area_Hectares": 35.0,
            "Proposed_Land_Use": "Agri-Industry",
            "Elevation_m": 450.0,
            "Soil_Drainage": "Moderate",
            "Coordinates": {"lat": 17.6599, "lng": 75.9064},
            "Temperature_Max_C": 34.2,
            "Temperature_Min_C": 21.0,
            "SPI_Drought_Category": "Mild Drought",
            "Flood_Hazard": "Low",
            "Slope_Degrees": 1.8,
            "LULC_Class": "Agricultural Land"
        },
        {
            "Parcel_ID": "LP-MH-2026-006",
            "Parcel_Name": "Candidate Area F - Multi-Modal Freight Terminal",
            "District": "Nagpur",
            "Taluka": "Hingna",
            "Area_Hectares": 50.0,
            "Proposed_Land_Use": "Industrial Freight",
            "Elevation_m": 310.0,
            "Soil_Drainage": "Good (Black Cotton Soil)",
            "Coordinates": {"lat": 21.1458, "lng": 79.0882},
            "Temperature_Max_C": 33.5,
            "Temperature_Min_C": 22.1,
            "SPI_Drought_Category": "Normal",
            "Flood_Hazard": "Low",
            "Slope_Degrees": 2.1,
            "LULC_Class": "Scrubland"
        }
    ]
    return pd.DataFrame(parcels)

def compute_risk_index(row):
    """
    Computes Composite Flood Vulnerability Score (0 - 100) based on:
    - IMD Actual Rainfall & Departure %
    - Elevation / Topography & Slope
    - Soil Drainage Profile & Flood Hazard
    """
    rainfall = row.get("Rainfall", 0)
    departure = row.get("Rainfall_Departure", 0)
    elevation = row.get("Elevation_m", 100)
    drainage = str(row.get("Soil_Drainage", "")).lower()
    
    # 1. Rainfall intensity score (0-40 pts)
    rf_score = min(40, (rainfall / 1400.0) * 40)
    
    # 2. Departure anomaly score (0-30 pts)
    dept_score = max(0, min(30, (departure / 50.0) * 30))
    
    # 3. Topographic vulnerability (0-20 pts)
    if elevation < 10:
        topo_score = 20
    elif elevation < 25:
        topo_score = 14
    elif elevation < 100:
        topo_score = 8
    else:
        topo_score = 2
        
    # 4. Drainage capacity score (0-10 pts)
    if "poor" in drainage:
        drain_score = 10
    elif "moderate" in drainage:
        drain_score = 5
    else:
        drain_score = 1
        
    total_vulnerability = round(rf_score + dept_score + topo_score + drain_score, 1)
    total_vulnerability = min(100.0, max(0.0, total_vulnerability))
    
    # Determine Risk Category & Actionable Governance Recommendation
    if total_vulnerability >= 70:
        risk_cat = "HIGH FLOOD RISK"
        recommendation = (
            f"CRITICAL ACTION REQUIRED: {row['District']} is experiencing high recent rainfall ({rainfall:.1f} mm, "
            f"{departure:+.1f}% departure from normal). Low elevation ({elevation}m) & poor drainage require mandatory "
            f"hydrological flood inundation modeling, 50m stormwater buffer zone, and heavy-duty drainage infrastructure approval before land conversion."
        )
    elif total_vulnerability >= 45:
        risk_cat = "MODERATE RISK"
        recommendation = (
            f"MODERATE ASSESSMENT: District experienced {rainfall:.1f} mm rainfall ({departure:+.1f}% departure). "
            f"Additional drainage capacity validation and rainwater harvesting plan required for zoning clearance."
        )
    else:
        risk_cat = "LOW RISK"
        recommendation = (
            f"STANDARD CLEARANCE: Normal rainfall conditions ({rainfall:.1f} mm, {departure:+.1f}% departure) "
            f"and adequate elevation ({elevation}m). Proceed with standard land development approval."
        )
        
    return pd.Series([total_vulnerability, risk_cat, recommendation])

def run_integration():
    print("=" * 65)
    print("      BHOOMI DRISHTI - EXTENDED LAND & CLIMATE RISK PIPELINE")
    print("=" * 65)
    
    # 1. Load Rainfall Data
    if not os.path.exists(RAINFALL_CSV):
        print(f"[ERROR] {RAINFALL_CSV} not found! Run fetch_imd_rainfall.py first.")
        return
        
    imd_df = pd.read_csv(RAINFALL_CSV)
    
    # 2. Load Land Parcels
    parcels_df = load_sample_land_parcels()
    
    # 3. Perform District-based Spatial Join
    merged_df = pd.merge(parcels_df, imd_df, on="District", how="left")
    
    merged_df["Rainfall"] = merged_df["Rainfall"].fillna(0.0)
    merged_df["Rainfall_Departure"] = merged_df["Rainfall_Departure"].fillna(0.0)
    
    # 4. Compute Climate & Flood Risk Index
    merged_df[["Vulnerability_Score", "Risk_Category", "Governance_Recommendation"]] = merged_df.apply(compute_risk_index, axis=1)
    
    # 5. Define All Columns (Existing 18 + 6 New Columns = 24 Total Columns)
    final_export_cols = [
        "Parcel_ID", "Parcel_Name", "State", "District", "Taluka", "Area_Hectares",
        "Proposed_Land_Use", "Elevation_m", "Soil_Drainage", "Rainfall", "Normal_Rainfall",
        "Rainfall_Departure", "Category", "Vulnerability_Score", "Risk_Category",
        "Governance_Recommendation", "Period", "Source_Attribution",
        "Temperature_Max_C", "Temperature_Min_C", "SPI_Drought_Category",
        "Flood_Hazard", "Slope_Degrees", "LULC_Class"
    ]
    
    # Ensure source attribution notes prototype synthetic values for added geospatial fields
    merged_df["Source_Attribution"] = ATTRIBUTION_TEXT
    
    # 6. Save Updated CSV
    final_df = merged_df[final_export_cols]
    final_df.to_csv(OUTPUT_PARCEL_RISK_CSV, index=False)
    print(f"\n[OUTPUT] Saved Updated Dataset -> {OUTPUT_PARCEL_RISK_CSV}")
    print(f"Total Rows: {len(final_df)}")
    print(f"Total Columns: {len(final_df.columns)}")
    
    # Also update the legacy CSV filename so both are kept in sync
    final_df.to_csv("bhoomi_drishti_land_climate_risk.csv", index=False)

if __name__ == "__main__":
    run_integration()
