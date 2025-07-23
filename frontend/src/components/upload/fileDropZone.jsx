import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";

const FileDropzone = ({
  onFileSelect,
  isUploading = false,
  uploadProgress = 0,
  className,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setError("");

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === "file-too-large") {
          setError("File size exceeds 100MB limit");
        } else if (rejection.errors[0].code === "file-invalid-type") {
          setError("Invalid file type. Only .dcm and .zip files are supported");
        } else {
          setError("File upload failed");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/dicom": [".dcm"],
      "application/zip": [".zip"],
    },
    maxSize: 100 * 1024 * 1024,
    multiple: false,
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const dropzoneClasses = [
    "dropzone",
    isDragActive ? "active" : "",
    isUploading ? "disabled" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div {...getRootProps()} className={dropzoneClasses}>
        <input {...getInputProps()} disabled={isUploading} />

        <div className="dropzone-content">
          {!selectedFile ? (
            <>
              <div className="dropzone-icon">
                <Upload size={32} className="text-medical-blue" />
              </div>
              <div className="dropzone-text">
                <h3>
                  {isDragActive ? "Drop your scan here" : "Upload Medical Scan"}
                </h3>
                <p>
                  Drag and drop or{" "}
                  <span className="dropzone-link">browse files</span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="dropzone-icon success">
                <File size={32} className="text-medical-success" />
              </div>
              <div className="dropzone-text">
                <h3>{selectedFile.name}</h3>
                <p>{formatFileSize(selectedFile.size)}</p>
              </div>
            </>
          )}

          <div className="dropzone-info">
            <p>Supported formats: .dcm, .zip</p>
            <p>Maximum size: 100MB</p>
          </div>
        </div>

        {isUploading && (
          <div className="dropzone-overlay">
            <div className="dropzone-upload">
              <div className="dropzone-upload-icon">
                <Upload size={32} className="text-medical-blue" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <p
                  style={{ fontSize: "0.875rem", fontWeight: "500", margin: 0 }}
                >
                  Uploading...
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-muted-foreground)",
                    margin: 0,
                  }}
                >
                  {uploadProgress}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={16} className="alert-icon" />
          <p>{error}</p>
        </div>
      )}

      {selectedFile && !error && !isUploading && (
        <div className="alert alert-success">
          <CheckCircle size={16} className="alert-icon" />
          <p>File ready for upload</p>
        </div>
      )}

      {!selectedFile && (
        <button
          className="btn btn-outline"
          style={{ width: "100%" }}
          onClick={() => document.querySelector('input[type="file"]')?.click()}
        >
          <Upload size={16} />
          Choose File
        </button>
      )}
    </div>
  );
};

export default FileDropzone;
