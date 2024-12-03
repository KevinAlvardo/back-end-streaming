const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Registro
router.post(
    '/register',
    [
        body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already in use' });
            }

            const user = new User({ username, email, password });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Error registering user', details: err.message });
        }
    }
);

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reset preferences
router.post('/reset-preferences', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findByIdAndUpdate(userId, { preferences: [] }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
