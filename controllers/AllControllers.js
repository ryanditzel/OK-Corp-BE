const req = require("express/lib/request");
const { User, Review, Company } = require("../models");
const { Op, sequelize } = require("sequelize");
const middleware = require("../middleware");

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
      where: { userId: req.params.user_id },
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
    const review = await Review.update(
      { ...req.body },
      { where: { id: req.params.review }, returning: true }
    );
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

// AUTH CONTROLLERS
const Login = async (req, res) => {
  console.log(req.body.password);
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true,
    });
    console.log(user, req.body.password);
    if (
      user &&
      (await middleware.comparePassword(user.password, req.body.password))
    ) {
      let payload = {
        id: user.id,
        email: user.email,
      };
      let token = middleware.createToken(payload);
      return res.send({ user: payload, token });
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" });
  } catch (error) {
    throw error;
  }
};

const Register = async (req, res) => {
  try {
    const { email, firstName, lastName, userName, pass } = req.body;
    let passwordDigest = await middleware.hashPassword(pass);
    const password = passwordDigest;
    const user = await User.create({
      email,
      firstName,
      lastName,
      userName,
      password,
    });
    res.send(user);
  } catch (error) {
    throw error;
  }
};

const CheckSession = async (req, res) => {
  const { payload } = res.locals;
  res.send(payload);
};
// AUTH CONTROLLERS ^^^^^^^^^

module.exports = {
  GetProfiles,
  GetUserProfile,
  GetAllReviews,
  GetReviewByID,
  GetReviewByUserID,
  CreateReview,
  EditReview,
  DeleteReview,
  Login,
  Register,
  CheckSession,
};
