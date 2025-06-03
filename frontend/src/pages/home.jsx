import React from 'react';
import UploadForm from '../components/uploadForm';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Scanetrix</h1>
      <p>Upload your medical scans and explore them in 3D.</p>
      <UploadForm />
    </div>
  );
};

export default Home;
