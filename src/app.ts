import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import adminRouter from "./routes/adminRoutes";

const app: Application = express();
// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use("/api", userRouter);
app.use("/api/admin", adminRouter);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
