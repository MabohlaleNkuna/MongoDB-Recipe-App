const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { email, password, username, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({
      email,
      password,
      username,
      role: role || 'user', 
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role, 
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const protectAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); 
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' }); // User is not an admin
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role, 
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email) user.email = email;
    if (password) user.password = password; 

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove(); 
    return res.status(204).send(); 
  } catch (error) {
    console.error("Error deleting user:", error); 
    return res.status(500).json({ message: 'An error occurred while deleting the user' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  createUser: registerUser, 
  updateUser,
  deleteUser,
  protectAdmin,
};
