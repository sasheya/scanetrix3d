import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    // Fetch uploaded scans from the backend here
    fetch('/api/uploads')
      .then((res) => res.json())
      .then((data) => setUploads(data));
  }, []);

  return (
    <div>
      <h3>Your Dashboard</h3>
      
      <ul>
        {uploads.map((upload, index) => (
          <li key={index}>
            <span>{upload.name}</span>
            {/* Link to the viewer page with the scan */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
