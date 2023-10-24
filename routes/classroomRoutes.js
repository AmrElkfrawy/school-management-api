const express = require("express");

const studentRouter = require("./studentsRoutes");
const classroomController = require("../controllers/classroomController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(classroomController.getAllClassrooms)
  .post(classroomController.createClassroom);

router
  .route("/:id")
  .get(classroomController.getClassroom)
  .patch(classroomController.updateClassroom)
  .delete(classroomController.deleteClassroom);

router.use("/:classroomId/students", studentRouter);

module.exports = router;
