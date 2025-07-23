import React from "react";

export function StatCard({ title, value, icon: Icon, trend, className = "" }) {
  return (
    <div className={`card stat-card ${className}`}>
      <div className="stat-card-content">
        <div className="stat-info">
          <p className="stat-title">{title}</p>
          <div className="stat-value-row">
            <p className="stat-value">{value}</p>
            {trend && (
              <span
                className={`stat-trend ${
                  trend.isPositive ? "positive" : "negative"
                }`}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            )}
          </div>
        </div>
        <div className="stat-icon">
          <Icon />
        </div>
      </div>
    </div>
  );
}
