const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();
const userRoutes = require('./routes/userRoutes'); 
const recipeRoutes = require('./routes/recipeRoutes'); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors()); 

// Log the MongoDB URI to verify it's loaded
console.log("MongoDB URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use user routes
app.use('/api/users', userRoutes);

app.use('/recipes', recipeRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
