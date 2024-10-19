// server/server.js
const express = require('express');
const cors = require('cors');
const { client, connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define a route to handle form submissions
app.post('/api/appointments', async (req, res) => {
  try {
    const { name, contact, timeSlot } = req.body;
    const appointment = { name, contact, timeSlot };
    
    // Insert the new appointment into the MongoDB collection
    const db = client.db('myDatabase'); // Replace 'myDatabase' with your actual database name
    const collection = db.collection('appointments'); // Replace 'appointments' with your actual collection name

    await collection.insertOne(appointment);
    res.status(201).send('Appointment created successfully!');
  } catch (error) {
    res.status(400).send('Error creating appointment: ' + error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
