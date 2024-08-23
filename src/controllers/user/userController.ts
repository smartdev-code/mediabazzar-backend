import { Request, Response } from "express";
import { registerUser, loginUser } from "../../services/authService";
import { User } from "../../models/userModel";

export const init = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.user._id).select("-password");
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const logout = (req: Request, res: Response) => {
  // Handle logout (e.g., invalidate token)
  res.json({ message: "Logged out successfully" });
};
