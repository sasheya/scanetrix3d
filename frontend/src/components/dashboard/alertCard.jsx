import React, { useState } from "react";
import { AlertTriangle, XCircle, Info, X } from "lucide-react";

const mockAlerts = [
  {
    id: "1",
    type: "error",
    title: "Upload Failed",
    message:
      "Brain_MRI_Patient_005.dcm could not be processed due to corrupted file format.",
    timestamp: "5 minutes ago",
  },
  {
    id: "2",
    type: "warning",
    title: "Low Storage Space",
    message: "Your storage is 85% full. Consider cleaning up old files.",
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    type: "info",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight from 2-4 AM EST.",
    timestamp: "3 hours ago",
  },
];

const getAlertIcon = (type) => {
  switch (type) {
    case "error":
      return XCircle;
    case "warning":
      return AlertTriangle;
    case "info":
      return Info;
    default:
      return Info;
  }
};

export function AlertCard() {
  const [alerts, setAlerts] = useState(mockAlerts);

  const dismissAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <AlertTriangle />
          Alerts ({alerts.length})
        </h3>
      </div>
      <div className="card-content">
        <div className="alerts-list">
          {alerts.map((alert) => {
            const AlertIcon = getAlertIcon(alert.type);
            return (
              <div key={alert.id} className={`alert-item alert-${alert.type}`}>
                <div className="alert-icon">
                  <AlertIcon />
                </div>
                <div className="alert-content">
                  <h4 className="alert-title">{alert.title}</h4>
                  <p className="alert-message">{alert.message}</p>
                  <p className="alert-timestamp">{alert.timestamp}</p>
                </div>
                <button
                  className="alert-dismiss"
                  onClick={() => dismissAlert(alert.id)}
                >
                  <X />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
