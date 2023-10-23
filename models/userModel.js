const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide your name"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Provide your email"],
    validate: [validator.isEmail, "Provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "Provide a password"],
    minlength: [8, "Provide password longer than 8 characters"],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Confirm your passowrd"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password doesn't match!",
    },
  },

  photo: {
    type: String,
    default: "test",
  },
  role: {
    type: String,
    enum: ["super-admin", "school-admin", "student"],
    default: "student",
  },
});

const studentSchema = new mongoose.Schema({
  classroom: {
    type: String,
    required: [true, "Provide the classroom ID"],
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: [true, "Provide the school ID"],
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Provide the user ID"],
  },
});

const schoolAdminSchema = new mongoose.Schema({
  school: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Provide the school ID"],
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Provide the user ID"],
  },
});
// super admins don't have custom fields

// pre middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

// Create Models
const User = mongoose.model("User", userSchema);
const Student = mongoose.model("Student", studentSchema);
const SchoolAdmin = mongoose.model("SchoolAdmin", schoolAdminSchema);

module.exports = { User, Student, SchoolAdmin };
