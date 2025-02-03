import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configDotenv();
const app = express();

const PORT=3000;
// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store
let items = [];

// CRUD Routes
// Create
app.get('*', (req, res) => {
  res.send(`Hii, I am Docker Testing NodeJs with Using CI/CD on Google Cloud, Neeraj after env data ${process.env.PORT} ${process.env.isDev}`);
});

const buildPath = path.join(__dirname, "dist");
app.use(express.static(buildPath));

// SPA fallback for React routing
app.get("/a", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});


app.post('/items', (req, res) => {
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read All
app.get('/items', (req, res) => {
  res.json(items);
});

// Read One
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// Update
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  Object.assign(item, req.body);
  res.json(item);
});

// Delete
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  items.splice(index, 1);
  res.status(204).send();
});
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
// Start Server
// app.listen(aPORT, () => {
//   console.log(`Server running on http://localhost:${aPORT}`);
// });
