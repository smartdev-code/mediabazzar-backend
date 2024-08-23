import app from "./src/app";
import dotenv from "dotenv";
import connectToDatabase from "./src/db/mongodb"; // Import the connection function

dotenv.config();

const PORT = process.env.PORT || 3030;

const startServer = async () => {
  await connectToDatabase(); // Connect to MongoDB before starting the server

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
