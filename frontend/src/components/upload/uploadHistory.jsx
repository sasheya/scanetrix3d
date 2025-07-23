import React from "react";
import {
  History,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  ArrowRight,
} from "lucide-react";

const mockUploads = [
  {
    id: "1",
    fileName: "brain_mri_001.dcm",
    patientId: "PT-2024-001",
    modalityType: "MRI",
    uploadDate: "2024-01-15 14:30",
    status: "completed",
    size: "45.2 MB",
  },
  {
    id: "2",
    fileName: "chest_ct_scan.zip",
    patientId: "PT-2024-002",
    modalityType: "CT",
    uploadDate: "2024-01-15 13:15",
    status: "processing",
    size: "78.9 MB",
  },
  {
    id: "3",
    fileName: "spine_mri_series.dcm",
    patientId: "PT-2024-003",
    modalityType: "MRI",
    uploadDate: "2024-01-15 11:45",
    status: "failed",
    size: "52.1 MB",
  },
];

const UploadHistory = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-medical-success" />;
      case "processing":
        return <Clock size={16} className="text-medical-warning" />;
      case "failed":
        return <AlertCircle size={16} className="text-medical-error" />;
      default:
        return <Clock size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status) => {
    const badgeClass =
      {
        completed: "badge badge-success",
        processing: "badge badge-warning",
        failed: "badge badge-error",
      }[status] || "badge";

    return <span className={badgeClass}>{status}</span>;
  };

  return (
    <div className="card">
      <div className="card-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 className="card-title">
            <History size={20} className="text-medical-blue" />
            <span>Recent Uploads</span>
          </h2>
          <button className="btn btn-outline btn-sm">
            View All
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
      <div className="card-content">
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {mockUploads.map((upload) => (
            <div key={upload.id} className="upload-item">
              <div className="upload-item-content">
                {getStatusIcon(upload.status)}
                <div className="upload-item-details">
                  <p className="upload-item-name">{upload.fileName}</p>
                  <div className="upload-item-meta">
                    <span>{upload.patientId}</span>
                    <span>•</span>
                    <span>{upload.modalityType}</span>
                    <span>•</span>
                    <span>{upload.size}</span>
                  </div>
                  <p className="upload-item-date">{upload.uploadDate}</p>
                </div>
              </div>

              <div className="upload-item-actions">
                {getStatusBadge(upload.status)}
                {upload.status === "completed" && (
                  <button className="btn btn-ghost btn-icon">
                    <Eye size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {mockUploads.length === 0 && (
          <div className="empty-state">
            <History size={32} className="empty-state-icon" />
            <p className="empty-state-text">No recent uploads</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadHistory;
