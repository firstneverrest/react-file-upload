import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const data = new FormData();
    console.log(selectedFile);

    data.append('file', selectedFile, selectedFile.name);
    console.log(data);

    // fetch('http://localhost:8080/upload', {
    //   method: 'POST',
    //   body: data
    // })
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  };

  return (
    <div className="App">
      <h3>File upload</h3>
      <input type="file" onChange={fileSelectedHandler} />
      <button onClick={fileUploadHandler}>Upload</button>
    </div>
  );
}

export default App;
