const express = require('express');
const { addAddress, getUserAddresses } = require('../controllers/addressController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, addAddress);
router.get('/my-addresses', protect, getUserAddresses);

module.exports = router;
