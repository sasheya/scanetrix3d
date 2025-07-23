import React from "react";
import {
  Brain,
  Settings,
  LogOut,
  Bell,
  Sun,
  Home,
  Upload,
  Eye,
  BarChart3,
} from "lucide-react";

export function AppSidebar() {
  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Brain />
          </div>
          <div className="sidebar-brand-text">
            <h1>Scanetrix</h1>
            <p>Medical Imaging</p>
          </div>
        </div>
      </div>

      <div className="sidebar-content">
        {/* Navigation */}
        <div className="sidebar-group">
          <div className="sidebar-group-label">Navigation</div>
          <ul className="sidebar-menu">
            <li className="sidebar-menu-item">
              <button className="sidebar-menu-button active">
                <Home />
                Dashboard
              </button>
            </li>
            <li className="sidebar-menu-item">
              <button className="sidebar-menu-button">
                <Upload />
                Upload Scans
              </button>
            </li>
            <li className="sidebar-menu-item">
              <button className="sidebar-menu-button">
                <Eye />
                Viewer
              </button>
            </li>
            <li className="sidebar-menu-item">
              <button className="sidebar-menu-button">
                <BarChart3 />
                Analytics
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="sidebar-group">
          <div className="sidebar-group-label">Quick Actions</div>
          <ul className="sidebar-menu">
            <li className="sidebar-menu-item">
              <button className="sidebar-menu-button">
                <Bell />
                Notifications
                <span className="notification-badge">3</span>
              </button>
            </li>
            <li className="sidebar-menu-item">
              <button className="sidebar-menu-button">
                <Sun />
                Theme
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer - User Profile */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">AS</div>
          <div className="sidebar-user-info">
            <p>Dr. Aditi Sharma</p>
            <p>Radiologist</p>
          </div>
        </div>

        <div className="sidebar-actions">
          <button className="btn btn-ghost btn-sm">
            <Settings />
          </button>
          <button className="btn btn-ghost btn-sm">
            <LogOut />
          </button>
        </div>
      </div>
    </div>
  );
}
