const Classroom = require("../models/classroomModel");
const School = require("../models/schoolModel");

exports.getAllClassrooms = async (req, res) => {
  try {
    let filter = {};
    if (req.params.schoolId) {
      filter.school = req.params.schoolId;
    }
    const classrooms = await Classroom.find(filter);
    res.status(200).json({
      status: "success",
      results: classrooms.length,
      data: {
        classrooms,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    return res.status(200).json({
      status: "success",
      data: {
        classroom,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createClassroom = async (req, res) => {
  try {
    const school = await School.findById(req.params.schoolId);
    if (!school) {
      return res.status(404).json({
        status: "error",
        message: "School not found",
      });
    }
    const classroom = new Classroom();
    classroom.name = req.body.name;
    classroom.school = req.params.schoolId;
    classroom.capacity = req.body.capacity;

    await classroom.save();

    return res.status(201).json({
      status: "success",
      data: {
        classroom,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, capacity: req.body.capacity },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: "success",
      data: {
        classroom,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
