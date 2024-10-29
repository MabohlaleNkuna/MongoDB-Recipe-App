const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json()); 

// Log the MongoDB URI to verify it's loaded
console.log("MongoDB URI:", process.env.MONGO_URI); 


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Updated here
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
