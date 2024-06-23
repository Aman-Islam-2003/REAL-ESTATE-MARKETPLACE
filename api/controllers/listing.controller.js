import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return next(errorHandler(404, "Listing doesnt exist"));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(404, "You can only delete your own listing"));
    }
    await Listing.findByIdAndDelete(id);
    res.status(200).json("Listing deleted successfully!!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(404, "You can only update your own listing"));
    }

    const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(errorHandler(404, "Id is required"));
    }
    const listing = await Listing.findById(id);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
