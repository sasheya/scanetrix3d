import React, { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the file upload logic here
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
