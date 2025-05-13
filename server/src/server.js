import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import connectDB from "./config/db.js";
import configurePassport from "./config/passport.js";
import routes from "./routes/index.js";
import config from "./config/config.js";
import { errorConverter, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = config.port || 5000;

connectDB();
configurePassport();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(passport.initialize());

app.use(routes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
