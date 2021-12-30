import React, { useState } from 'react';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="App">
      <h1 className="App-header">File upload</h1>
      <input type="file" onChange={(e) => onImageChange(e)} />
      <div></div>
      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile)}
          style={{ width: 300, height: 300 }}
        />
      )}
    </div>
  );
};

export default Upload;
