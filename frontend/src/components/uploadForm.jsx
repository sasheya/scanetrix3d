import React, { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    await uploadScan();
  };

  const uploadScan = async () => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('/upload/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token from login
      },
      body: formData,
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log('File uploaded:', data);
    } else {
      console.error('Upload failed');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload Scan:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
