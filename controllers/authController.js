require("dotenv").config();

const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Customer, User } = require("../models");

const register = async (req, res, next) => {
  try {
    // Object
    const { email, username, password, confirmPassword, name, age, role } =
      req.body;

    // Email unique check
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      next(new ApiError("Email already taken", 400));
      return;
    }

    // Username unique check
    const checkUsername = await User.findOne({
      where: {
        username,
      },
    });
    if (checkUsername) {
      next(new ApiError("Username already taken", 400));
      return;
    }

    // Password should be greater than or equal 8
    const passwordLength = password <= 8;
    if (passwordLength) {
      next(new ApiError("Email already taken", 400));
      return;
    }

    // Confirm Password check
    if (password !== confirmPassword) {
      next(new ApiError("Password does not match", 400));
      return;
    }

    // Hashing
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newCustomer = await Customer.create({
      name,
      age,
      role,
    });

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      customerId: newCustomer.id,
    });

    res.status(201).json({
      status: "Success",
      data: {
        ...newCustomer,
        email,
        password: hashedPassword,
        username,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
    return;
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
      include: ["Customer"],
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.customerId,
          username: user.username,
          role: user.Customer.role,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES,
        }
      );
      res.status(200).json({
        status: "Success",
        message: "Berhasil login",
        data: token,
      });
    } else {
      new next(new ApiError("Not Found User Or Wrong Password", 400));
    }
  } catch (err) {
    new next(new ApiError(err.message, 500));
  }
};

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
    return;
  }
};

module.exports = {
  register,
  login,
  authenticate,
};
