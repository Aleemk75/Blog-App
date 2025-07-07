import mongoose from "mongoose";



export const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if(value.length < 3) return false;
    if (typeof value === "string") {
        return true;
    }
}

export const isValidBody = function (body) {
    return Object.keys(body).length > 0;
}

export function validateObjectId(req, res, next) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  next();
}
