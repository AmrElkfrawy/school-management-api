const express = require("express");

const studentController = require("../controllers/studentController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(studentController.getAllStudents)
  .post(studentController.addStudent);

router
  .route("/:id")
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);

module.exports = router;
