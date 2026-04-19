const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Serve your HTML file
app.use(express.static('public'));

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ 
    url: `${req.protocol}://${req.get('host')}/files/${req.file.filename}` 
  });
});

// IMPORTANT: Use 0.0.0.0 and PORT env var
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
