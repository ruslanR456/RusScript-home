const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ⚠️ In production, use environment variables (.env file)
const ADMIN_USER = process.env.ADMIN_USER || "r456gaming";
const ADMIN_PASS = process.env.ADMIN_PASS || "08977";

// Verify admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true, token: 'admin_token_' + Date.now() });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get projects
app.get('/api/projects', (req, res) => {
  const projects = JSON.parse(require('fs').readFileSync('projects.json', 'utf8') || '[]');
  res.json(projects);
});

// Add project (requires valid token)
app.post('/api/projects', (req, res) => {
  const { title, description, link, token } = req.body;

  if (!token || !token.startsWith('admin_token_')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (title.length < 3) {
    return res.status(400).json({ success: false, message: 'Title required' });
  }

  let projects = JSON.parse(require('fs').readFileSync('projects.json', 'utf8') || '[]');
  projects.push({ title, description, link: link || '' });
  require('fs').writeFileSync('projects.json', JSON.stringify(projects, null, 2));

  res.json({ success: true, message: 'Project added' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
