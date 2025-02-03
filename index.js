const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const recipeRoutes = require('./routes/recipeRoutes'); 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/', recipeRoutes); 

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running');
});  
