const { uploadToGridFS } = require('./imageController');
const { getBucket } = require('../db/db');

exports.uploadBookImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(200).json({ message: 'File uploaded successfully' });
    }
    if (!req.bookId) {
      return;
    }
    const imageID = req.bookId.toString();
    await uploadToGridFS(req.file, imageID);
    return res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.image = async (req, res) => {
  try {
    const bucket = getBucket();
    const filename = req.params.bookId;
    const files = await bucket.find({ filename }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }
    const downloadStream = bucket.openDownloadStreamByName(filename);
    downloadStream.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
