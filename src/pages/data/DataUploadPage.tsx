import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Globe2,
  ChevronRight,
  ShieldCheck,
  Info
} from 'lucide-react';

export const DataUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [selectedFile, setSelectedFile] = useState<string | null>('mh_cadastral_vectors_phase3.geojson');
  const [fileFormat, setFileFormat] = useState<string>('GeoJSON Vector');
  const [detectedCategory, setDetectedCategory] = useState<string>('Cadastral & Land Use');
  const [verificationStatus, setVerificationStatus] = useState<'OFFICIAL_SOURCE' | 'PROTOTYPE_DERIVED' | 'SYNTHETIC_PROTOTYPE'>('OFFICIAL_SOURCE');
  const [datasetTitle, setDatasetTitle] = useState<string>('Maharashtra Cadastral Boundary Vectors (Phase 3)');
  const [sourceOrg, setSourceOrg] = useState<string>('Department of Revenue & Land Records, Govt. of MH');

  const handleSimulateValidation = () => {
    setStep(2);
  };

  const handleCompleteUpload = () => {
    setStep(3);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200">
        <div className="flex items-center space-x-2">
          <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            DATA INGESTION PIPELINE
          </span>
          <span className="text-slate-500 text-xs font-semibold">Dataset & GIS Vector Upload</span>
        </div>
        <h1 className="text-xl font-bold text-[#123B63] mt-1">Batch Departmental Data & GIS Vector Ingestion</h1>
        <p className="text-slate-600 text-xs mt-1">
          Supports CSV, GeoJSON, Shapefiles, GeoTIFF, and JSON spatial payloads. Automated schema & geometry validation run before dataset activation.
        </p>
      </div>

      {/* Batch Ingestion Architectural Notice */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-xs text-slate-700 space-y-1">
        <div className="flex items-center space-x-2 text-[#123B63] font-bold">
          <Info className="w-4 h-4 text-[#1D5D91]" />
          <span>Batch Data Ingestion vs Manual Record Entry</span>
        </div>
        <p className="text-slate-600 leading-relaxed text-[11px]">
          <strong>No Manual Row-by-Row Typing:</strong> Policy and District Officers do not manually input individual land records. The platform ingests authoritative departmental CSV/GeoJSON data dumps (such as IMD climate CSVs, State Cadastral GeoJSONs, or SIH benchmark CSVs) as an operational fallback when direct live API streams are awaiting whitelisting.
        </p>
      </div>

      {/* Upload Progress Stepper */}
      <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#123B63]' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 1 ? 'bg-[#123B63]' : 'bg-slate-300'}`}>1</span>
            <span>1. Select & Detect Format</span>
          </div>

          <div className="h-0.5 flex-1 bg-slate-200 mx-4" />

          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#123B63]' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 2 ? 'bg-[#123B63]' : 'bg-slate-300'}`}>2</span>
            <span>2. Automated Quality & Geometry QA</span>
          </div>

          <div className="h-0.5 flex-1 bg-slate-200 mx-4" />

          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 3 ? 'bg-emerald-600' : 'bg-slate-300'}`}>3</span>
            <span>3. Assign Provenance & Save</span>
          </div>
        </div>
      </div>

      {/* STEP 1: FILE SELECTION */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200 space-y-4">
          <h2 className="text-sm font-bold text-[#123B63]">Step 1: Select Spatial / Tabular File</h2>

          <div className="border-2 border-dashed border-slate-300 bg-slate-50 p-8 rounded-lg text-center space-y-3">
            <Upload className="w-10 h-10 mx-auto text-[#1D5D91]" />
            <div>
              <p className="text-xs font-bold text-slate-800">Drag & drop your dataset file here, or browse</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Supported formats: .geojson, .shp (zip), .csv, .geotiff, .json (Max 100 MB)
              </p>
            </div>
            <span className="inline-block px-3 py-1 bg-[#123B63] text-white text-xs font-semibold rounded cursor-pointer">
              Choose File
            </span>
          </div>

          {selectedFile && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">{selectedFile}</span>
                <span className="px-2 py-0.5 bg-blue-200 text-blue-900 rounded font-bold text-[10px]">
                  Detected Format: {fileFormat}
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Format Detection: GeoJSON FeatureCollection with 12,400 Polygon features detected.
              </p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSimulateValidation}
              className="px-5 py-2 bg-[#123B63] hover:bg-[#1D5D91] text-white text-xs font-bold rounded shadow-xs transition inline-flex items-center space-x-1.5"
            >
              <span>Run Automated Validation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AUTOMATED QUALITY QA */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200 space-y-4">
          <h2 className="text-sm font-bold text-[#123B63]">Step 2: Automated Validation Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
              <span className="font-bold text-emerald-800 block">Geometry Validity</span>
              <span className="text-lg font-bold text-emerald-900 mt-1 block">99.8% Passed</span>
              <span className="text-[10px] text-emerald-700">0 Self-intersections detected</span>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <span className="font-bold text-blue-800 block">Missing Values</span>
              <span className="text-lg font-bold text-blue-900 mt-1 block">0.2% Warning</span>
              <span className="text-[10px] text-blue-700">24 optional attributes null</span>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
              <span className="font-bold text-emerald-800 block">Coordinate System (CRS)</span>
              <span className="text-lg font-bold text-emerald-900 mt-1 block">EPSG:4326</span>
              <span className="text-[10px] text-emerald-700">WGS84 Standard Validated</span>
            </div>
          </div>

          {/* Form Metadata Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-200 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Dataset Title</label>
              <input
                type="text"
                value={datasetTitle}
                onChange={(e) => setDatasetTitle(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-[#1D5D91]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Source Organization</label>
              <input
                type="text"
                value={sourceOrg}
                onChange={(e) => setSourceOrg(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-[#1D5D91]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Dataset Category</label>
              <select
                value={detectedCategory}
                onChange={(e) => setDetectedCategory(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-[#1D5D91]"
              >
                <option value="Cadastral & Land Use">Cadastral & Land Use</option>
                <option value="LULC">LULC Land Use</option>
                <option value="Climate & Rainfall">Climate & Rainfall</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Provenance Verification Status</label>
              <select
                value={verificationStatus}
                onChange={(e: any) => setVerificationStatus(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-[#1D5D91] font-semibold text-slate-800"
              >
                <option value="OFFICIAL_SOURCE">OFFICIAL SOURCE (Verified Govt Record)</option>
                <option value="PROTOTYPE_DERIVED">PROTOTYPE DERIVED (Model / Simulation)</option>
                <option value="SYNTHETIC_PROTOTYPE">SYNTHETIC PROTOTYPE (Test Dataset)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded hover:bg-slate-300 transition"
            >
              Back
            </button>
            <button
              onClick={handleCompleteUpload}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded shadow-xs transition"
            >
              Confirm & Save Dataset
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SUCCESS */}
      {step === 3 && (
        <div className="bg-white p-8 rounded-lg shadow-xs border border-slate-200 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-lg font-bold text-[#123B63]">Dataset Successfully Saved & Ingested</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {datasetTitle} has been saved into PostGIS spatial storage with status <strong>{verificationStatus}</strong>.
          </p>
          <div className="pt-2 flex justify-center space-x-3">
            <button
              onClick={() => navigate('/data/datasets')}
              className="px-4 py-2 bg-[#123B63] text-white text-xs font-bold rounded shadow-xs hover:bg-[#1D5D91] transition"
            >
              Go to Dataset Inventory
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
