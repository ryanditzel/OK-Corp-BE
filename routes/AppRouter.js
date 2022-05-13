const Router = require("express").Router();
const controller = require("../controllers/AllControllers");
const middleware = require("../middleware");

//############### AUTHENTICATION ROUTE #############################
Router.post("/register", controller.Register);
Router.post("/login", controller.Login);
Router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
);

//################### REVIEW ROUTE ############################
Router.get("/reviews", controller.GetAllReviews);
Router.get("/reviews/:review_id", controller.GetReviewByID);
Router.get("/reviews/user/:user_id", controller.GetReviewByUserID);
Router.post(
  "/reviews/create",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateReview
);
Router.put(
  "/reviews/update/:review_id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.EditReview
);
Router.delete(
  "/reviews/delete/:review_id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteReview
);

module.exports = Router;
