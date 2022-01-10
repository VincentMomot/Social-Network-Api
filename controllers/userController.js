const { User, Thought } = require('../models');

const userCount = async () =>
    User.aggregate()
        .count('userCount')
        .then((numberOfUsers) => numberOfUsers);

module.exports = {
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    userCount: await userCount(),
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: "No matching ID" })
                    : res.json({
                        user,
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((User) => res.json(User))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.findOneAndUpdate(
                        { users: req.params.userId },
                        { $pull: { users: req.params.userId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: "User deleted with no thoughts",
                    })
                    : res.json({ message: "User deleted" })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    addThought(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { thoughts: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { thought: { thoughtId: req.params.thoughtId } } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } }
        )
            .then((user) => {
                return !user
                    ? res.status(404).json({ message: "No user found" })
                    : res.json(user);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that ID :(" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};