import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SMARTDEV-CODE";

export const userAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && typeof decoded === "object" && decoded.role === "user") {
      req.body.user = decoded;
      next();
    } else {
      res.status(403).json({ message: "Not authorized as a user" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export const adminAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && typeof decoded === "object" && decoded.role === "admin") {
      req.body.admin = decoded;
      next();
    } else {
      res.status(403).json({ message: "Not authorized as an admin" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
