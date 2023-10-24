const express = require("express");

const classroomRouter = require("./classroomRoutes");
const studentRouter = require("./studentsRoutes");
const schoolController = require("../controllers/schoolController");

const router = express.Router();

router
  .route("/")
  .get(schoolController.getAllSchools)
  .post(schoolController.createSchool);

router
  .route("/:id")
  .get(schoolController.getSchool)
  .patch(schoolController.updateSchool)
  .delete(schoolController.deleteSchool);

router.use("/:schoolId/classrooms", classroomRouter);
router.use("/:schoolId/students", studentRouter);

module.exports = router;
