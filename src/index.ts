import "./LoadEnv"; // Must be the first import
import morgan from "morgan";

import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { myService } from '@controllers/User';
import {createUserXml} from '@helpers/wsdl/createUser';

import {soap as s} from 'express-soap';


// Init express
const app = express();
// Db URL
const dbUrl: any = process.env.DB;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.raw({type: function(){return true;}, limit: '5mb'}));

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/", s({services:myService,wsdl:createUserXml}));


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
      console.log(`server initialized on port ${port}` );
    });
  })
  .catch(() => console.log("database connection failed"));

// Export express instance
export default app;
