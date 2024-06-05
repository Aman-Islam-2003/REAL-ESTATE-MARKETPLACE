import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
 // const { username, email, password } = req.body;
  try{
    const { username, email, password } = req.body;
  if (!username || !email || !password)
    return next(errorHandler(400, "Required Fields cannot be empty"));
  let user = await User.findOne({
    email,
  });
  if (user) return next(errorHandler(409, "User already Exist"));
  const hashedPassword = bcryptjs.hashSync(password,10)
  user = new User({
    username,
    email,
    password:hashedPassword,
  });
  await user.save();
  res.status(200).json( "User created successfully");
  } catch (err) {
    next(errorHandler(500, 'error here'))
  }
};

export const signin = async (req,res,next)=>{
  try{
  const {email, password} = req.body;
    if(!email || !password){
      return next(errorHandler(400, "Required Fields cannot be empty"));
    }

    const user = await User.findOne({email});
    if(!user){
      return next(errorHandler(409, "User doesn't exist"));
    }
    const validPassword = bcryptjs.compareSync(password,user.password);
    if(!validPassword){
      return next(errorHandler(409, "Wrong credentials"));
    }
    const token = jwt.sign({id:user.id}, process.env.JWT_SECRET)
    console.log(user)
    const {password:pass, ...rest} = user._doc;
    res.cookie("access-token", token, {
      httpOnly: true,
    }).status(200).json(rest)

  }catch (err) {
    next(errorHandler(500, 'error here'))
  }
}
