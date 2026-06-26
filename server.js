const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) so your separate React app can talk to this server
app.use(cors({ origin: 'http://localhost:5173' })); // standard Vite local development server domain path
app.use(express.json());

// Establish connection to MongoDB Atlas cluster 
mongoose.connect('mongodb+srv://Praharsha:praharsha2026@cluster0.grn8ozq.mongodb.net/syntecxhub?retryWrites=true&w=majority')
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("Database Connection Error:", err));

// Route endpoints linking to CRUD controller files
app.use("/api/employees", require("./employeeroutes"));

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend REST API server listening securely on port ${PORT}`));