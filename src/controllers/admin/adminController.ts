import { Request, Response } from "express";
import { registerAdmin, loginAdmin } from "../../services/authService";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const admin = await registerAdmin(username, email, password);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: "Error registering admin", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginAdmin(email, password);
    if (token) {
      res.json({ token });
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
