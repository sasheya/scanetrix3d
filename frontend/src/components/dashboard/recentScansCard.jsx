import React from "react";
import { CheckCircle, Clock, XCircle, FileText } from "lucide-react";

const mockScans = [
  {
    id: "1",
    name: "Brain_MRI_Patient_001",
    timestamp: "2 hours ago",
    status: "rendered",
    type: "MRI",
  },
  {
    id: "2",
    name: "Chest_CT_Patient_002",
    timestamp: "4 hours ago",
    status: "processing",
    type: "CT",
  },
  {
    id: "3",
    name: "Spine_MRI_Patient_003",
    timestamp: "6 hours ago",
    status: "failed",
    type: "MRI",
  },
  {
    id: "4",
    name: "Knee_XRay_Patient_004",
    timestamp: "1 day ago",
    status: "rendered",
    type: "X-Ray",
  },
];

const getStatusConfig = (status) => {
  switch (status) {
    case "rendered":
      return {
        label: "Rendered",
        className: "badge-success",
        icon: CheckCircle,
      };
    case "processing":
      return {
        label: "Processing",
        className: "badge-processing",
        icon: Clock,
      };
    case "failed":
      return {
        label: "Failed",
        className: "badge-error",
        icon: XCircle,
      };
    default:
      return {
        label: status,
        className: "badge-success",
        icon: CheckCircle,
      };
  }
};

export function RecentScansCard() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <FileText />
          Recent Scans
        </h3>
      </div>
      <div className="card-content">
        <div className="recent-scans-list">
          {mockScans.map((scan) => {
            const statusConfig = getStatusConfig(scan.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div key={scan.id} className="scan-item">
                <div className="scan-info">
                  <h4 className="scan-name">{scan.name}</h4>
                  <div className="scan-meta">
                    <span className="scan-type">{scan.type}</span>
                    <span className="scan-timestamp">{scan.timestamp}</span>
                  </div>
                </div>
                <div className="scan-actions">
                  <span className={`badge ${statusConfig.className}`}>
                    <StatusIcon
                      style={{
                        width: "0.75rem",
                        height: "0.75rem",
                        marginRight: "0.25rem",
                      }}
                    />
                    {statusConfig.label}
                  </span>
                  <button className="btn btn-outline btn-sm">View</button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <button className="btn btn-outline">See All Scans</button>
        </div>
      </div>
    </div>
  );
}
