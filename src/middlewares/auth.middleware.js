import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  //res used nai hora so _ we can write!
  //in case of middleware u gotta write next in the args
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    //in header ull get Bearer token so we removing Bearer <space> and just token remains
    if (!token) {
      throw new ApiError(401, "Unauthorized Request!");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password",
      "refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token!");
    }

    req.user = user; //req.mesh = user; -> also works lol
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
