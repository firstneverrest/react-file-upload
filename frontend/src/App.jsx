import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();
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
      console.log(fileName);
      console.log(filePath);
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
      {/* <form onSubmit={fileUploadHandler}> */}
      <h3>File upload</h3>
      <input type="file" onChange={fileSelectedHandler} />
      <button onClick={(e) => fileUploadHandler(e)}>Upload</button>
      {/* </form> */}
      {uploadedFile && (
        <div>
          <h3>{uploadedFile.fileName}</h3>
          <img src={uploadedFile.filePath} alt="logo" />
        </div>
      )}
    </div>
  );
}

export default App;
