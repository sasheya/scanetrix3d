import React, { useState, useEffect } from 'react';
import Viewer3D from '../components/viewer3D';

const Viewer = () => {
  const [scanData, setScanData] = useState(null);

  useEffect(() => {
    // Fetch scan data or 3D model to be displayed
    fetch('/api/scanData')
      .then((res) => res.json())
      .then((data) => setScanData(data));
  }, []);

  return (
    <div>
      <h1>3D Scan Viewer</h1>
      {scanData && <Viewer3D scanData={scanData} />}
    </div>
  );
};

export default Viewer;
