const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'deadlines.json');

// Core synchronous filesystem reading/writing logic
const readData = () => {
  if (!fs.existsSync(FILE_PATH)) {
    const initialSeed = [
      { id: 1, title: 'Web Engineering Exam', type: 'Exam', subject: 'Computing', due_date: new Date(Date.now() + 172800000).toISOString().slice(0, 16) }
    ];
    fs.writeFileSync(FILE_PATH, JSON.stringify(initialSeed, null, 2));
    return initialSeed;
  }
  return JSON.parse(fs.readFileSync(FILE_PATH));
};

const writeData = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
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

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Local Backend listening on port ${PORT}`));