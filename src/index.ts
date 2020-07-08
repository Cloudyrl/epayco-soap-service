import "./LoadEnv"; // Must be the first import
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import soap from 'soap';

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import mongoose from "mongoose";

import logger from "@shared/Logger";
import { handleError, ErrorHandler } from "@helpers/ErrorHandler";

// Init express
const app = express();
// Db URL
const dbUrl: any = process.env.DB;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.raw({type: function(){return true;}, limit: '5mb'}));
app.use(cors());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
// if (process.env.NODE_ENV === "production") {
//   app.use(helmet());
// }

app.use("/", (req, res) => {
  res.json("hello world");
});

// Print & Handle API errors
// app.use(
//   (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
//     logger.error(err.message, err);
//     handleError(err, res);
//   }
// );

//Db connection
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
      logger.info("Express server started on port: " + port);
    });
  })
  .catch(() => console.log("database connection failed"));

// Export express instance
export default app;
