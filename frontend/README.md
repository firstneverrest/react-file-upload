# React file upload

File uploading with both frontend (React) and backend (NodeJS) example.

## frontend

Use FormData objects to create set of key/value pairs to send file. `FormData.append()` method creates set of key/value pairs. The value in FormData can be a Blob, File or a string: if the value is neither a Blob nor a File, the value is converted to a string. When sending data is FormData, the browser will automatically add the header content type: multipart/form-data.

```js
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
```

## backend

Use express-fileupload package to handle file uploading. It enable access file props via `req.files.file`. When successfully receive file from client, backend store upload file at frontend/public/uploads and send file name & file path as response back to client.

```js
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.post('/upload', function (req, res) {
  if (!req.files) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.file;

  file.mv(
    `${path.join(__dirname, '../')}frontend/public/uploads/${file.name}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.status(200).json({
        fileName: file.name,
        filePath: `/uploads/${file.name}`,
      });
    }
  );
});

app.listen(5000, () => console.log('Server started on port 5000'));
```
