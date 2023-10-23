const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide the classroom name"],
  },
  capacity: {
    type: Number,
    required: [true, "Provide the classroom capacity"],
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: [true, "Provide the school ID"],
  },
});

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;
