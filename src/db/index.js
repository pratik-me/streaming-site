import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";    // Use .js with file names else there will be error of not finding the file
import express from "express";

// Generally a semi-colon is added before the start of code in some production-level projects to make it easier to debug issues. It's optional and not necessary for functionality.;


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        // for(let i in connectionInstance) {
        //     console.log(i);
        // }
        console.log(`\n MongoDB connected!! \nDB HOST: ${connectionInstance.connection.host}`);
        for(let i in connectionInstance.connection) {
            console.log(i);
        }
    } catch (error) {
        console.log(`MONGODB connection failed with error :\n ${error}`)
        process.exit(1);
        
    }
}

export default connectDB;

/*
const app = express();
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log("Error :", error)
        });
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port : ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error :", error);
    }
})();
*/