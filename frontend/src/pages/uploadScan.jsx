import React, { useState } from "react";
import "../stylesheets/upload.css";
import FileDropzone from "../components/upload/fileDropZone";
import ScanDetailsForm from "../components/upload/scanDetailsForm";
import UploadHistory from "../components/upload/uploadHistory";
import { useToast } from "../hooks/useToast";
import { Upload, FileImage, Loader2 } from "lucide-react";

const UploadScan = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [scanTitle, setScanTitle] = useState("");
  const [modalityType, setModalityType] = useState("");
  const [notes, setNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { toast } = useToast();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    if (!scanTitle) {
      setScanTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Complete! ✅",
            description:
              "Your scan has been successfully uploaded and is ready for visualization.",
            duration: 5000,
          });

          // Reset form
          setSelectedFile(null);
          setPatientId("");
          setScanTitle("");
          setModalityType("");
          setNotes("");
          setUploadProgress(0);

          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No File Selected ❌",
        description: "Please select a valid DICOM file before uploading.",
      });
      return;
    }

    if (!patientId.trim()) {
      toast({
        variant: "destructive",
        title: "Patient ID Required ❌",
        description: "Please enter a patient ID before uploading.",
      });
      return;
    }

    if (!modalityType) {
      toast({
        variant: "destructive",
        title: "Modality Type Required ❌",
        description: "Please select the scan modality type.",
      });
      return;
    }

    simulateUpload();
  };

  const isFormValid = selectedFile && patientId.trim() && modalityType;

  return (
    <div className="upload-container">
      <div className="upload-content">
        <div className="upload-grid">
          {/* Main Upload Section */}
          <div className="upload-main">
            <div className="card animate-fade-in-up">
              <div className="card-header">
                <h2 className="card-title">
                  <Upload size={20} className="text-medical-blue" />
                  <span>Select Scan File</span>
                </h2>
              </div>
              <div className="card-content">
                <FileDropzone
                  onFileSelect={handleFileSelect}
                  isUploading={isUploading}
                  uploadProgress={uploadProgress}
                />
              </div>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <ScanDetailsForm
                patientId={patientId}
                setPatientId={setPatientId}
                scanTitle={scanTitle}
                setScanTitle={setScanTitle}
                modalityType={modalityType}
                setModalityType={setModalityType}
                notes={notes}
                setNotes={setNotes}
              />
            </div>

            <div className="submit-container">
              <button
                className={`btn btn-medical btn-lg ${
                  !isFormValid || isUploading ? "" : ""
                }`}
                onClick={handleSubmit}
                disabled={!isFormValid || isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Uploading... {Math.round(uploadProgress)}%
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Upload & Visualize
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="upload-sidebar">
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <UploadHistory />
            </div>

            <div
              className="card animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="card-header">
                <h2 className="card-title text-medical-blue">Quick Tips</h2>
              </div>
              <div className="card-content">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <div className="tips-item">
                    <div className="tips-bullet" />
                    <p className="tips-text">
                      DICOM files contain medical imaging data and metadata
                    </p>
                  </div>
                  <div className="tips-item">
                    <div className="tips-bullet" />
                    <p className="tips-text">
                      ZIP files can contain multiple DICOM slices
                    </p>
                  </div>
                  <div className="tips-item">
                    <div className="tips-bullet" />
                    <p className="tips-text">
                      Patient data is handled securely and anonymized
                    </p>
                  </div>
                  <div className="tips-item">
                    <div className="tips-bullet" />
                    <p className="tips-text">
                      Processing time depends on file size and complexity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadScan;
