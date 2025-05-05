import React, { useState, useEffect } from 'react';
import Viewer3D from '../components/viewer3D';

const Viewer = () => {
  const [uploads, setUploads] = useState([]);
  const [selectedUploadId, setSelectedUploadId] = useState(null);
  const [processingStatus, setProcessingStatus] = useState({}); // { uploadId: status }
  const [processedResults, setProcessedResults] = useState(null);
  const [scanData, setScanData] = useState(null);

  useEffect(() => {
    // Fetch user uploads when the component mounts
    fetchUserUploads();
  }, []);

  const fetchUserUploads = async () => {
    try {
      const response = await fetch('/upload/uploads', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUploads(data);
      } else {
        console.error('Failed to fetch uploads');
      }
    } catch (error) {
      console.error('Error fetching uploads:', error);
    }
  };

  const handleUploadSelect = (uploadId) => {
    setSelectedUploadId(uploadId);
    setProcessedResults(null); // Clear previous results when selecting a new upload
    setScanData(null); // Clear previous scan data
  };

  const triggerProcessing = async () => {
    if (!selectedUploadId) {
      alert('Please select an upload to process.');
      return;
    }
    setProcessingStatus((prev) => ({ ...prev, [selectedUploadId]: 'Processing...' }));
    try {
      const response = await fetch(`/process/${selectedUploadId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
        },
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setProcessingStatus((prev) => ({ ...prev, [selectedUploadId]: 'Processing triggered' }));
      } else {
        const data = await response.json();
        alert(data.message);
        setProcessingStatus((prev) => ({ ...prev, [selectedUploadId]: 'Processing failed' }));
      }
    } catch (error) {
      console.error('Error triggering processing:', error);
      alert('An error occurred while triggering processing.');
      setProcessingStatus((prev) => ({ ...prev, [selectedUploadId]: 'Processing failed' }));
    }
  };

  const fetchProcessedResults = async () => {
    if (!selectedUploadId) {
      alert('Please select an upload to fetch results for.');
      return;
    }
    setProcessingStatus((prev) => ({ ...prev, [selectedUploadId]: 'Fetching results...' }));
    try {
      const response = await fetch(`/process/results/${selectedUploadId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
        },
      });
      if (response.ok) {
        // Assuming the backend returns the file directly or a URL to the file
        // For simplicity, let's assume it returns a URL or the data directly
        const data = await response.blob(); // Or .json() if backend returns JSON with URL
        setProcessedResults(data);
        setScanData(URL.createObjectURL(data)); // Create a URL for the Viewer3D component
        setProcessingStatus((prev) => ({ ...prev, [selectedUploadId]: 'Results fetched' }));
      } else {
        const data = await response.json();
        alert(data.message);
        setProcessingStatus((prev) => ({ ...prev, [selectedUploadId]: 'Fetching results failed' }));
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      alert('An error occurred while fetching results.');
      setProcessingStatus((prev) => ({ ...prev, [selectedUploadId]: 'Fetching results failed' }));
    }
  };

  return (
    <div className="viewer-container">
      <h1>3D Scan Viewer</h1>
      <div className="uploads-section">
        <h2>Your Uploads</h2>
        <ul className="uploads-list">
          {uploads.map((upload) => (
            <li key={upload.id}>
              {upload.filename} - {new Date(upload.date_uploaded).toLocaleDateString()}
              <button onClick={() => handleUploadSelect(upload.id)} disabled={selectedUploadId === upload.id}>Select</button>
              {selectedUploadId === upload.id && (
                <>
                  <button onClick={triggerProcessing} disabled={processingStatus[upload.id] === 'Processing...'}>Process</button>
                  <button onClick={fetchProcessedResults} disabled={processingStatus[upload.id] === 'Fetching results...'}>View Results</button>
                  <span className="status-text">{processingStatus[upload.id]}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      {scanData && <Viewer3D scanData={scanData} />}
    </div>
  );
};

export default Viewer;
