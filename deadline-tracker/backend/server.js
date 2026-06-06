const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'deadlines.json');

// Helper functions to read/write JSON data locally
const readData = () => {
  if (!fs.existsSync(FILE_PATH)) {
    // Generate initial sample seed items if the file doesn't exist yet
    const initialSeed = [
      { id: 1, title: 'Web Engineering Assignment', type: 'Assignment', subject: 'Computing', due_date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16) }
    ];
    fs.writeFileSync(FILE_PATH, JSON.stringify(initialSeed, null, 2));
    return initialSeed;
  }
  const rawData = fs.readFileSync(FILE_PATH);
  return JSON.parse(rawData);
};

const writeData = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

// --- API ENDPOINTS ---

// 1. READ ALL
app.get('/api/deadlines', (req, res) => {
  try {
    const deadlines = readData();
    res.json(deadlines);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve deadlines' });
  }
});

// 2. CREATE
app.post('/api/deadlines', (req, res) => {
  try {
    const deadlines = readData();
    const newDeadline = { id: Date.now(), ...req.body };
    deadlines.unshift(newDeadline); // Put the newest items at the top
    writeData(deadlines);
    res.status(201).json(newDeadline);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add deadline' });
  }
});

// 3. DELETE
app.delete('/api/deadlines/:id', (req, res) => {
  try {
    const { id } = req.params;
    let deadlines = readData();
    deadlines = deadlines.filter((item) => item.id !== parseInt(id));
    writeData(deadlines);
    res.json({ success: true, message: 'Deadline successfully checked off' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove deadline' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server successfully listening on port ${PORT}`));