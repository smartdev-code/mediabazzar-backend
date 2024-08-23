import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: any; // You can replace 'any' with a more specific type if you have a specific structure for the user
  }
}
