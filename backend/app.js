import * as dotenv from "dotenv";
dotenv.config();
import cluster from "cluster";
import { availableParallelism } from "node:os";
import express from "express";
import { dbConnect } from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import hardwareRequestRouter from "./routes/hardwareRequestRoute.js";
import productRouter from "./routes/productRoutes.js";
import subRouter from "./routes/subscriptionRoute.js";
import userRouter from "./routes/userRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import supportRouter from "./routes/supportRoutes.js";
import corsOptions from "./config/corsOptions.js";
const PORT = 4000;

// Cluster module Setup
const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Restart the worker process
    cluster.fork();
  });
} else {
  const app = express();
  dbConnect();
  //Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use(cookieParser());

  // Router

  app.use("/auth", authRouter);
  app.use("/admin", adminRouter);
  app.use("/hardwareRequest", hardwareRequestRouter);
  app.use("/product", productRouter);
  app.use("/subscribe", subRouter);
  app.use("/user", userRouter);
  app.use("/notification", notificationRouter);
  app.use("/support", supportRouter);
  app.use("/", (req, res) => {
    res
      .status(200)
      .send("welcome to nanohostng, specify the path you want to visit");
  });

  app.listen(PORT, () => console.log(`app running on PORT ${PORT}`));
  console.log(`Worker ${process.pid} started`);
}
