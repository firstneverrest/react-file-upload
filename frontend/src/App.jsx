import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <div className="App">
      <h1 className="App-header">File upload</h1>
      <section>
        <input
          className="App-input"
          type="file"
          onChange={fileSelectedHandler}
        />
        <button className="App-button" onClick={fileUploadHandler}>
          Upload
        </button>
      </section>
      {uploadedFile && (
        <div className="upload">
          <h3 className="upload_header">{uploadedFile.fileName}</h3>
          <img
            className="upload_image"
            src={uploadedFile.filePath}
            alt="logo"
          />
        </div>
      )}
    </div>
  );
}

export default App;
