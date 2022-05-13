const req = require("express/lib/request");
const { User, Review, Company } = require("../models");
const { Op, sequelize } = require("sequelize");

// USER CONTROLLERS
const GetProfiles = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    throw error;
  }
};

const GetUserProfile = async (req, res) => {
  try {
    const userAndReview = await User.findByPk(req.params.user_id, {
      include: [{ model: Review, as: "review" }],
    });
    res.send(userAndReview);
  } catch (error) {
    throw error;
  }
};
// REVIEW CONTROLLERS
const GetAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.send(reviews);
  } catch (error) {
    throw error;
  }
};

const GetReviewByID = async (req, res) => {
  try {
    const reviews = await Review.findOne({
      where: { id: req.params.review_id },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.send(reviews);
  } catch (error) {
    throw error;
  }
};

const GetReviewByUserID = async (req, res) => {
  try {
    const reviewOfUser = await Review.findAll({
      include: [{ model: User, attributes: ["username"] }],
      where: { user_id: req.params.user_id },
    });
    res.send(reviewOfUser);
  } catch (error) {
    throw error;
  }
};

const CreateReview = async (req, res) => {
  try {
    await Review.create({ ...req.body });
    res.send({ msg: "Review created successfully" });
  } catch (error) {
    throw error;
  }
};

const EditReview = async (req, res) => {
  try {
    const update = req.params.review_id;
    const review = await Review.findByPk(update);
    review.update({ ...req.body });
    res.send(review);
  } catch (error) {
    throw error;
  }
};

const DeleteReview = async (req, res) => {
  try {
    await Review.destroy({ where: { id: req.params.review_id } });
    res.send({
      msg: "Review Deleted",
      payload: req.params.review_id,
      status: "Ok",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  GetProfiles,
  GetUserProfile,
  GetAllReviews,
  GetReviewByID,
  GetReviewByUserID,
  CreateReview,
  EditReview,
  DeleteReview,
};
