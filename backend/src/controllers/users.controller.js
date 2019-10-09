usersCtrl = {};

const User = require('../models/User');

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

usersCtrl.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({
        username
    })
    await newUser.save();
    res.json({message: 'User Saved!'});
}
usersCtrl.getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
}
usersCtrl.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    await User.findByIdAndUpdate(id, {
        username
    })
    res.json({message: "User Updated!!"});
}

usersCtrl.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({message: "User deleted!"});
}

module.exports = usersCtrl;