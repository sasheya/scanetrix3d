import React from "react";
import { User, Stethoscope, FileText } from "lucide-react";

const ScanDetailsForm = ({
  patientId,
  setPatientId,
  scanTitle,
  setScanTitle,
  modalityType,
  setModalityType,
  notes,
  setNotes,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <FileText size={20} className="text-medical-blue" />
          <span>Scan Details</span>
        </h2>
      </div>
      <div className="card-content">
        <div className="form-grid">
          <div className="form-grid two-cols">
            <div className="form-field">
              <label htmlFor="patientId" className="form-label">
                <User size={16} className="text-muted-foreground" />
                <span>Patient ID</span>
              </label>
              <input
                id="patientId"
                className="form-input"
                placeholder="Enter patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="modalityType" className="form-label">
                <Stethoscope size={16} className="text-muted-foreground" />
                <span>Modality Type</span>
              </label>
              <select
                id="modalityType"
                className="form-select"
                value={modalityType}
                onChange={(e) => setModalityType(e.target.value)}
              >
                <option value="">Select scan type</option>
                <option value="MRI">MRI - Magnetic Resonance Imaging</option>
                <option value="CT">CT - Computed Tomography</option>
                <option value="PET">PET - Positron Emission Tomography</option>
                <option value="XRAY">X-Ray</option>
                <option value="ULTRASOUND">Ultrasound</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="scanTitle" className="form-label">
              Scan Title
            </label>
            <input
              id="scanTitle"
              className="form-input"
              placeholder="Enter descriptive scan title"
              value={scanTitle}
              onChange={(e) => setScanTitle(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="notes" className="form-label">
              Clinical Notes
            </label>
            <textarea
              id="notes"
              className="form-textarea"
              placeholder="Add any relevant clinical notes or observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanDetailsForm;
