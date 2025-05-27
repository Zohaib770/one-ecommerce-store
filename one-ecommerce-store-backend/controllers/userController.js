const User = require('../models/User');

const userRegister = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            message: "User registered successfully",
            user: user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    userRegister,
}