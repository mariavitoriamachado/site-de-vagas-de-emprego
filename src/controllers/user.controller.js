const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = {
    async create(req,res) {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async index(req,res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async details(req,res) {
        try {
            const id = req.params.id;
            const user = await User.findOne({ _id: { $eq: id } });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async delete(req,res) {
        try {
            const id = req.params.id;
            const user = await User.deleteOne({ _id: { $eq: id } });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async update(req,res) {
        try {
            const user = req.body;
            const id = user._id;
            const updatedUser = await User.updateOne({ _id: { $eq: id } }, user);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async login(req,res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: { $eq: email } });
            if (!user) {
                res.status(401).json({ message: 'Invalid email or password' });
            } else {
                user.isCorrectPassword(password, async function(err, same) {
                    if (err) {
                        res.status(500).json({ message: err });
                    } else if (!same) {
                        res.status(401).json({ message: 'Invalid email or password' });
                    } else {
                        const token = jwt.sign({ email }, config.secret, { expiresIn: '1h' });
                        res.status(200).json({ token });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async checkToken(req,res) {
        try {
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async destroyToken(req,res) {
        try {
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

  }