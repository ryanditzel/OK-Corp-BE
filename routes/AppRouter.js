const Router = require("express").Router();
const controller = require("../controllers/AllControllers");
// const middleware = require("../middleware");

Router.get("/reviews/all", controller.GetAllReviews);
Router.get("/reviews/:review_id", controller.GetReviewByID);
Router.get("/reviews/user/:user_id", controller.GetReviewByUserID);
Router.post("/reviews/create", controller.CreateReview);
Router.put("/reviews/update/:review_id", controller.EditReview);
Router.delete("/reviews/delete/:review_id", controller.DeleteReview);

module.exports = Router;
