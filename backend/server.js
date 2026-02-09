const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-keys.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Routes
// GET /api/todos
app.get('/api/todos', async (req, res) => {
  try {
    const snapshot = await db.collection('todos').get();
    const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/todos
app.post('/api/todos', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newTodo = {
      title,
      completed: false
    };
    const docRef = await db.collection('todos').add(newTodo);
    res.status(201).json({ id: docRef.id, ...newTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/todos/:id
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const todoRef = db.collection('todos').doc(id);
    const doc = await todoRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (completed !== undefined) updates.completed = completed;

    await todoRef.update(updates);
    res.json({ id, ...doc.data(), ...updates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/todos/:id
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('todos').doc(id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
