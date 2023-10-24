const School = require("../models/schoolModel");

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json({
      status: "success",
      results: schools.length,
      data: {
        schools,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.getSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    return res.status(200).json({
      status: "success",
      data: {
        school,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createSchool = async (req, res) => {
  try {
    const school = await School.create(req.body);

    return res.status(201).json({
      status: "success",
      data: {
        school,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: "success",
      data: {
        school,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
