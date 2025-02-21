const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// GET Endpoint - /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});

// POST Endpoint - /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        // Validate input
        if (!Array.isArray(data)) {
            return res.status(400).json({ "is_success": false, "message": "Invalid input" });
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const highestAlphabet = alphabets.length > 0
            ? [alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).pop()]
            : [];

        // Send response
        res.status(200).json({
            "is_success": true,
            "user_id": "akshay_22072003",
            "email": "22bai70198@cuchd.in",
            "roll_number": "22BAI70198",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ "is_success": false, "message": "Internal Server Error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
