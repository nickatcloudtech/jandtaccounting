const express = require('express');
const fs = require('fs').promises;
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Load content
async function loadContent() {
  const data = await fs.readFile('content.json', 'utf8');
  return JSON.parse(data);
}

app.get('/', async (req, res) => {
  const content = await loadContent();
  res.render('index', { content, active: 'homepage' });
});

app.get('/:page', async (req, res) => {
  const content = await loadContent();
  const page = req.params.page;
  if (['about', 'services', 'classes', 'forms', 'news', 'faq', 'contact'].includes(page)) {
    res.render('index', { content, active: page });
  } else {
    res.redirect('/');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
