import React from "react";
import { Upload, Eye, User, HelpCircle, Plus } from "lucide-react";

const actions = [
  {
    label: "Upload New Scan",
    icon: Upload,
    variant: "primary",
    description: "Add MRI or CT scan",
  },
  {
    label: "Go to Viewer",
    icon: Eye,
    variant: "outline",
    description: "View existing scans",
  },
  {
    label: "Edit Profile",
    icon: User,
    variant: "outline",
    description: "Update your info",
  },
  {
    label: "Support",
    icon: HelpCircle,
    variant: "outline",
    description: "Get help",
  },
];

export function QuickActionsCard() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <Plus />
          Quick Actions
        </h3>
      </div>
      <div className="card-content">
        <div className="quick-actions-grid">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className={`btn btn-${action.variant} quick-action-btn`}
              >
                <div className="quick-action-header">
                  <Icon />
                  <span className="quick-action-title">{action.label}</span>
                </div>
                <span className="quick-action-desc">{action.description}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
