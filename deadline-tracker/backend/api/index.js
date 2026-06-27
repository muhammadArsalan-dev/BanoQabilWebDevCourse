const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Points to /tmp storage where Vercel permits temporary file writes if needed
const FILE_PATH = process.env.VERCEL ? path.join('/tmp', 'deadlines.json') : path.join(__dirname, 'deadlines.json');

// Global memory fallback in case Vercel's ephemeral filesystem clears out
let memoryDeadlines = [
  { id: 1, title: 'Web Engineering Exam', type: 'Exam', subject: 'Computing', due_date: new Date(Date.now() + 172800000).toISOString().slice(0, 16) }
];

const readData = () => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify(memoryDeadlines, null, 2));
      return memoryDeadlines;
    }
    const data = JSON.parse(fs.readFileSync(FILE_PATH));
    memoryDeadlines = data; // Keep memory in sync
    return data;
  } catch (err) {
    return memoryDeadlines; // Graceful fallback to memory array
  }
};

const writeData = (data) => {
  try {
    memoryDeadlines = data;
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.log("Writing to disk skipped, falling back to serverless memory instance.");
  }
};

// REST API Operations
app.get('/api/deadlines', (req, res) => {
  try { res.json(readData()); } catch (err) { res.status(500).json({ error: 'Read crash' }); }
});

app.post('/api/deadlines', (req, res) => {
  try {
    const deadlines = readData();
    const newDeadline = { id: Date.now(), ...req.body };
    deadlines.unshift(newDeadline);
    writeData(deadlines);
    res.status(201).json(newDeadline);
  } catch (err) { res.status(500).json({ error: 'Write crash' }); }
});

app.delete('/api/deadlines/:id', (req, res) => {
  try {
    const { id } = req.params;
    let deadlines = readData();
    deadlines = deadlines.filter(item => item.id !== parseInt(id));
    writeData(deadlines);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: 'Delete crash' }); }
});

// Important: Only run app.listen locally. Vercel runs serverless setups without it.
if (!process.env.VERCEL) {
  const PORT = 5000;
  app.listen(PORT, () => console.log(`🚀 Local Backend listening on port ${PORT}`));
}

module.exports = app;