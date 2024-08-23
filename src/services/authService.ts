import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/userModel";
import { Admin, IAdmin } from "../models/adminModel";

const JWT_SECRET = process.env.JWT_SECRET || "SMARTDEV-CODE";

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  return user.save();
};

export const registerAdmin = async (
  username: string,
  email: string,
  password: string
): Promise<IAdmin> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, email, password: hashedPassword });
  return admin.save();
};

export const loginUser = async (
  email: string,
  password: string
): Promise<any | null> => {
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const userWithoutPassword: any = user.toObject();
    delete userWithoutPassword.password;
    return {
      user: userWithoutPassword,
      token: jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      }),
    };
  }
  return null;
};

export const loginAdmin = async (
  email: string,
  password: string
): Promise<string | null> => {
  const admin = await Admin.findOne({ email });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    return jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
  }
  return null;
};
