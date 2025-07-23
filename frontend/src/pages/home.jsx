import React from 'react';
import { StatCard } from "../components/dashboard/statsCard.jsx";
import { RecentScansCard } from "../components/dashboard/recentScansCard.jsx";
import { QuickActionsCard } from "../components/dashboard/quickActionsCard.jsx";
import { ChartsCard } from "../components/dashboard/chartsCard.jsx";
import { AlertCard } from "../components/dashboard/alertCard.jsx";
// import { AppSidebar } from "../components/appSideBar.jsx";
import "../stylesheets/home.css";
import "../stylesheets/appSidebar.css";
import "../stylesheets/dashboardComp.css";


import { 
  Brain, 
  Target, 
  Skull, 
  Clock,
  Menu
} from "lucide-react";

const Home = () => {
  return (
    <div className="dashboard">
      {/* <AppSidebar /> */}
      
      {/* Main Content */}
      <main className="main-content">
        {/* Sidebar Trigger */}
        <div className="sidebar-trigger">
          <button className="btn btn-ghost">
            <Menu />
          </button>
        </div>

        {/* Welcome Message */}
        <div className="welcome-section">
          <h2 className="welcome-title">
            Welcome back, Dr. Aditi 👋
          </h2>
          <p className="welcome-subtitle">
            Here's what's happening with your medical imaging today.
          </p>
        </div>

        {/* Alerts Section */}
        <div className="alerts-section">
          <AlertCard />
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <StatCard
            title="Total Scans"
            value="1,247"
            icon={Brain}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Successful"
            value="1,189"
            icon={Target}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Failed"
            value="58"
            icon={Skull}
            trend={{ value: -3, isPositive: false }}
          />
          <StatCard
            title="Last Upload"
            value="2hrs ago"
            icon={Clock}
          />
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <ChartsCard />
        </div>

        {/* Bottom Grid */}
        <div className="bottom-grid">
          <RecentScansCard />
          <QuickActionsCard />
        </div>
      </main>
    </div>
  );
};

export default Home;