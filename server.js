const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

// সব রিকোয়েস্ট index.html-এ পাঠিয়ে দিন (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
