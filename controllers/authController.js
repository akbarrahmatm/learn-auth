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

module.exports = {
  register,
};
