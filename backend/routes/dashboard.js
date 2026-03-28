const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Data = require('../models/Data');

// Protect all dashboard routes
router.use(protect);

router.get('/data', async (req, res) => {
    try {
        const leads = await Data.find({ type: 'Lead' });
        const tasks = await Data.find({ type: 'Task' });
        const users = await Data.find({ type: 'User' });

        res.json({
            leads,
            tasks,
            users,
            user: {
                name: req.user.name,
                email: req.user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
