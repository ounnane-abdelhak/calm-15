const express = require("express");
const questionController = require("./../controllers/questionController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Route to get all questions
router
  .route("/")
  .get(questionController.getAllQuestions)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    questionController.createQuestion
  );
router.route("/level/:level").get(questionController.getQuestionsByLevel); // must be before "/:id"

// Route to get a single question by ID
router
  .route("/:id")
  .get(questionController.getQuestion)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    questionController.updateQuestion
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    questionController.deleteQuestion
  );
// router.route("/level/:level").get(questionController.getQuestionsByLevel);

module.exports = router;
