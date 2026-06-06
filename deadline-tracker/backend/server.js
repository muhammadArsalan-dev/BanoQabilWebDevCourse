const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'deadlines.json');

// Global in-memory variable fallback for Vercel Serverless environment
let memoryDeadlines = null;

const readData = () => {
  // If we already loaded data into memory, use it
  if (memoryDeadlines !== null) {
    return memoryDeadlines;
  }

  try {
    if (fs.existsSync(FILE_PATH)) {
      const rawData = fs.readFileSync(FILE_PATH);
      memoryDeadlines = JSON.parse(rawData);
      return memoryDeadlines;
    }
  } catch (err) {
    console.error("Read error, falling back to memory:", err);
  }

  // Initial seed if file reading fails or doesn't exist
  memoryDeadlines = [
    { id: 1, title: 'Web Engineering Assignment', type: 'Assignment', subject: 'Computing', due_date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16) }
  ];
  return memoryDeadlines;
};

const writeData = (data) => {
  memoryDeadlines = data; // Always update memory state
  try {
    // Attempt writing, but catch error so it doesn't crash on serverless environments
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.log("Note: Running in read-only environment. Saved to application memory.");
  }
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
    deadlines.unshift(newDeadline); 
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

// Required for Vercel serverless exports
module.exports = app;

const PORT = 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Backend server successfully listening on port ${PORT}`));
}