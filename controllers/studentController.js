const User = require("../models/userModel").User;
const Student = require("../models/userModel").Student;
const Classroom = require("../models/classroomModel");
const School = require("../models/schoolModel");

exports.getAllStudents = async (req, res) => {
  try {
    let filter = {};
    if (req.params.schoolId) {
      filter.school = req.params.schoolId;
    }
    if (req.params.classroomId) {
      filter.classroom = req.params.classroomId;
    }

    const students = await Student.find(filter).populate("userId");
    res.status(200).json({
      status: "success",
      results: students.length,
      data: {
        students,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("userId");
    return res.status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.addStudent = async (req, res) => {
  console.log(req.params);
  try {
    if (req.params.schoolId) {
      const school = await School.findOne({ _id: req.params.schoolId });
      if (!school) {
        return res.status(404).json({
          status: "error",
          message: "School not found",
        });
      }
    }

    if (req.params.classroomId) {
      const classroom = await Classroom.findOne({
        _id: req.params.classroomId,
        school: req.params.schoolId,
      });
      if (!classroom) {
        return res.status(404).json({
          status: "error",
          message: "Classroom not found",
        });
      }
    }

    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    await user.save();

    const student = new Student({
      userId: user._id,
      classroom: req.params.classroomId,
      school: req.params.schoolId,
    });

    await student.save();

    return res.status(201).json({
      status: "success",
      data: {
        student: user,
        "Student academic details": student,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    let student = null;

    if (req.body.classroom || req.body.school) {
      student = await Student.findOne({ _id: req.params.id });

      if (req.body.classroom) {
        // Check if the new classroomId is valid
        const newClassroom = await Classroom.findById(req.body.classroom);
        if (!newClassroom) {
          return res.status(404).json({
            status: "error",
            message: "Classroom not found",
          });
        }

        student.classroom = newClassroom._id;
      }

      if (req.body.school) {
        // Check if the new schoolId is valid
        const newSchool = await School.findById(req.body.school);
        if (!newSchool) {
          return res.status(404).json({
            status: "error",
            message: "School not found",
          });
        }

        student.school = newSchool._id;
      }

      await student.save({ validate: true });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        photo: req.body.photo,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: "success",
      data: {
        user,
        studentDetails: student,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
