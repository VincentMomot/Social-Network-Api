const{ Users, Thoughts} = require('../models');

module.exports={
    getUsers(req, res) {
        Users.find()
          .then((User) => res.json(User))
          .catch((err) => res.status(500).json(err));
      },
      getSingleUser(req, res) {
        Users.findOne({ _id: req.params.UserId })
          .select('-__v')
          .then((User) =>
            !User
              ? res.status(404).json({ message: 'No User with that ID' })
              : res.json(User)
          )
          .catch((err) => res.status(500).json(err));
      },
      createUser(req, res) {
        Users.create(req.body)
          .then((User) => res.json(User))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      deleteCourse(req, res) {
        Course.findOneAndDelete({ _id: req.params.courseId })
          .then((course) =>
            !course
              ? res.status(404).json({ message: 'No course with that ID' })
              : Student.deleteMany({ _id: { $in: course.students } })
          )
          .then(() => res.json({ message: 'Course and students deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
}