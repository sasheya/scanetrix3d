import React from 'react';
import HomeIcon from "@mui/icons-material/Home";
import UploadIcon from "@mui/icons-material/Upload";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

export const sideBarData = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    link: "/home",
  },
  {
    title: "Upload Scan",
    icon: <UploadIcon />,
    link: "/uploadScan",
  },
  {
    title: "Viewer",
    icon: <AutoAwesomeMotionIcon />,
    link: "/viewer",
  },
  {
    title: "Reports",
    icon: <AssessmentIcon />,
    link: "/reports",
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    link: "/settings",
  },
];
