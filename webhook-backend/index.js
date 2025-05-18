// webhook-backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// In-memory message store for development (replace with a real database in production)
const messagesByUser = {};

app.use(cors());
app.use(bodyParser.json());

// Endpoint to receive webhook POST requests
app.post('/webhook', (req, res) => {
  const { userId, name, message } = req.body;

  if (!userId || !name || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  if (!messagesByUser[userId]) {
    messagesByUser[userId] = [];
  }

  messagesByUser[userId].push({
    name,
    message,
    timestamp: Date.now(),
  });

  res.json({ success: true });
});

// 	Endpoint to retrieve messages by user ID
app.get('/messages/:userId', (req, res) => {
  const userId = req.params.userId;
  const messages = messagesByUser[userId] || [];
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});
