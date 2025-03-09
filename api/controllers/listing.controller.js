// import Listing from "../models/listing.model.js";
// import { errorHandler } from "../utils/error.js";

// export const createListing = async (req, res, next) => {
//   try {
//     const listing = await Listing.create(req.body);
//     return res.status(201).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteListing = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//       return next(errorHandler(404, "Listing doesnt exist"));
//     }
//     if (req.user.id !== listing.userRef) {
//       return next(errorHandler(404, "You can only delete your own listing"));
//     }
//     await Listing.findByIdAndDelete(id);
//     res.status(200).json("Listing deleted successfully!!");
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateListing = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//       return next(errorHandler(404, "Listing not found"));
//     }
//     if (req.user.id !== listing.userRef) {
//       return next(errorHandler(404, "You can only update your own listing"));
//     }

//     const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.status(200).json(updatedListing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getListing = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return next(errorHandler(404, "Id is required"));
//     }
//     const listing = await Listing.findById(id);
//     res.status(200).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getListings = async (req,res,next) => {
//   try{
//     const limit = req.query.limit || 9;
//     const startIndex = req.query.startIndex || 0;
//     let offer = req.query.offer;
//     let furnished = req.query.furnished;
//     let parking = req.query.parking;

//     if(offer === 'false' || offer === undefined){
//       offer = {$in: [false, true]};
//     }
//     if(furnished === 'false' || furnished === undefined){
//       furnished = {$in: [false, true]}
//     }
//     if(parking === 'false' || parking === undefined){
//       parking = {$in: [false, true]}
//     }

//     let type = req.query.type;
//     if(type === 'all' || type === undefined){
//       type = {$in: ['sale', 'rent']}
//     };

    const searchTerm = req.query.searchTerm  || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

//     const listings = await Listing.find({
//       name: {$regex: searchTerm, $options: 'i'},
//       offer,
//       furnished,
//       parking,
//       type
//     }).sort({[sort]: order})
//     .limit(limit)
//     .skip(startIndex);

//     res.status(200).json(listings);

//   }catch (error) {
//     next(error);
//   }
// }
