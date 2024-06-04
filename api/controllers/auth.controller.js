import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  console.log(req)
 // const { username, email, password } = req.body;
  try{
    const { username, email, password } = req.body;
  if (!username || !email || !password)
    return next(errorHandler(400, "Required Fields cannot be empty"));
  let user = await User.findOne({
    email,
  });
  if (user) return next(errorHandler(409, "User already Exist"));
  user = new User({
    username,
    email,
    password,
  });
  await user.save();
  res.status(200).json( "User created successfully");
  } catch (err) {
    next(errorHandler(500, 'error here'))
  }
};
