import React from 'react';

const MPRViewer = ({ slices }) => {
  return (
    <div>
      <h3>MPR Viewer</h3>
      {/* Implement MPR slice rendering logic here */}
      {slices.map((slice, index) => (
        <img key={index} src={slice} alt={`Slice ${index}`} />
      ))}
    </div>
  );
};

export default MPRViewer;
