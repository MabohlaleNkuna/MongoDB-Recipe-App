const express = require('express');
const { registerUser, loginUser, getUserById, updateUser, deleteUser, protectAdmin } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protect routes with authentication
router.use(protect);

router.get('/:id', getUserById); 
router.put('/:id', updateUser);
router.delete('/:id', protectAdmin, deleteUser); // Only admins can delete users

module.exports = router;
