const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Dòng này cực kỳ quan trọng để sửa lỗi "Cannot GET /"
app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log('=== HỆ THỐNG LÀNG LẠC VIỆT ĐÃ SẴN SÀNG ===');
});
