// import bcryptjs from "bcryptjs";
// import { errorHandler } from "../utils/error.js";
// import User from "../models/user.model.js";
// import Listing from "../models/listing.model.js"

// export const test = (req, res) => {
//   res.json("Hello world!!!");
// };

// export const updateUser = async (req, res, next) => {
//   const { id } = req.params;
//   const { user } = req;
//   if (user.id !== id)
//     return next(errorHandler(401, "You can only update your own account"));
//   try {
//     let { username, email, password, avatar } = req.body;
//     if (password) {
//       password = bcryptjs.hashSync(password, 10);
//     }
//     const updateUser = await User.findByIdAndUpdate(
//       id,
//       {
//         $set: {
//           username,
//           email,
//           password,
//           avatar,
//         },
//       },
//       { new: true }
//     );

//     const { password: pass, ...rest } = updateUser._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteUser = async (req, res, next) => {
//   try {
//     let { user } = req;
//     const { id } = req.params;

//     if (user.id != id) {
//       return next(errorHandler(401, "You can only delete your own account"));
//     }
//     await User.findByIdAndDelete(id);
//     res.clearCookie('access_token');
//     res.status(200).json("User deleted successfully!!");
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUserListings = async (req, res, next) => {
//   if (req.user.id === req.params.id) {
//     try {
//       const listings = await Listing.find({ userRef: req.params.id });
//       res.status(200).json(listings);
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     return next(errorHandler(401, 'You can only view your own listings!'));
//   }
// };

// export const getUser = async(req,res)=>{
//   try{
//     const {id} = req.params;
//     const user = await User.findById(id);
//     if(!user){
//       return next(errorHandler(401, 'User doesnt exist'));
//     }

//     const {password:pass, ...rest} = user._doc;
//     res.status(200).json(rest);

//   }catch (error) {
//       next(error);
//     }
// }

