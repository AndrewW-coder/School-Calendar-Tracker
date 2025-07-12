const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'events.json');

app.use(cors());
app.use(express.json());

// Utility: Read events from file
function readEvents() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Utility: Write events to file
function writeEvents(events) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
}

// GET all events
app.get('/api/events', (req, res) => {
  const events = readEvents();
  res.json(events);
});

// POST a new event
app.post('/api/events', (req, res) => {
  const events = readEvents();
  const newEvent = req.body;
  events.push(newEvent);
  writeEvents(events);
  res.status(201).json({ message: 'Event added', event: newEvent });
});

// DELETE an event by title (or any unique identifier)
app.delete('/api/events/:title', (req, res) => {
  const titleToDelete = req.params.title;
  let events = readEvents();
  const filtered = events.filter(event => event.title !== titleToDelete);
  writeEvents(filtered);
  res.json({ message: `Deleted event titled '${titleToDelete}'` });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
