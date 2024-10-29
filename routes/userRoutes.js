const express = require('express');
const { registerUser, loginUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser); 
router.get('/:id', getUserById); 
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
