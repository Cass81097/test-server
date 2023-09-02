const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let user = await userModel.findOne({ username });
    if (user)
      return res.json({ msg: "Username already used", status: false });

    const passwordCheck = await userModel.findOne({ password });
    if (passwordCheck)
      return res.json({ msg: "Password must be strong", status: false });

    user = new userModel({ username, password })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()
    const token = createToken(user._id);

    return res.json({ _id: user._id, username, isAvatarImageSet:false, avatarImage:"", token });

  } catch (ex) {
    next(ex);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (!user)
      return res.json({ msg: "Invalid username or password", status: false });

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword)
      return res.json({ msg: "Invalid username or password", status: false });

    const token = createToken(user._id);

    return res.json({ _id: user._id, username: user.username, isAvatarImageSet: user.isAvatarImageSet, avatarImage: user.avatarImage, token });
  } catch (ex) {
    next(ex);
  }
};

const findUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (ex) {
    next(ex);
  }
};

const getUser = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (ex) {
    next(ex);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await userModel.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports = { registerUser, loginUser, findUser, getUser, setAvatar };