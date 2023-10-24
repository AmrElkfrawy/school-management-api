const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide school name"],
    trim: true,
    unique: [true, "Name must be unique"],
  },
  location: {
    type: String,
    required: [true, "Prove school location"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;
