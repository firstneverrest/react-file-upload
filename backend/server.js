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

  file.mv(`${__dirname}/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.status(200).json({
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
    });
  });
});

app.listen(5000, () => console.log('Server started on port 5000'));
