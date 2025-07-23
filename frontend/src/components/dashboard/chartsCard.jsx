import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, PieChart as PieChartIcon } from "lucide-react";

const uploadData = [
  { month: "Jan", uploads: 45 },
  { month: "Feb", uploads: 52 },
  { month: "Mar", uploads: 67 },
  { month: "Apr", uploads: 73 },
  { month: "May", uploads: 81 },
  { month: "Jun", uploads: 89 },
];

const scanTypeData = [
  { name: "MRI", value: 45, color: "#008f9c" },
  { name: "CT", value: 30, color: "#40a69f" },
  { name: "X-Ray", value: 25, color: "#7dd3fc" },
];

export function ChartsCard() {
  return (
    <div className="charts-grid">
      {/* Upload Activity Chart */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <TrendingUp />
            Upload Activity
          </h3>
        </div>
        <div className="card-content">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={uploadData}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <Bar dataKey="uploads" fill="#008f9c" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Scan Type Distribution */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <PieChartIcon />
            Scan Types
          </h3>
        </div>
        <div className="card-content">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scanTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  dataKey="value"
                >
                  {scanTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            {scanTypeData.map((item) => (
              <div key={item.name} className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="legend-label">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
