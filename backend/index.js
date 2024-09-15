const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = []; // In-memory storage for users (use database in production)

// Secret key for JWT
const SECRET_KEY = 'your_jwt_secret_key';

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Validate password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    // Return the token and user info
    res.json({ token, user: { id: user.id, email: user.email } });
});

// Signup Route
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    if (users.find((u) => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create new user and add to the array
    const user = { id: Date.now(), email, password: hashedPassword };
    users.push(user);

    res.status(201).json({ message: 'User created successfully' });
});

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ message: 'Token is missing' });

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Protected Route (Example)
app.get('/profile', authenticateJWT, (req, res) => {
    res.json({ message: 'Profile accessed', user: req.user });
});

// Start the server
app.listen(5002, () => {
    console.log('Server running on port 5000');
});
