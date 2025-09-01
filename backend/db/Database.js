import mongoose from "mongoose";
import { DB_NAME } from "../config/constant.js";
import CONFIG from "../config/config.js";

const connectDatabase = async () => {
    try {

        const dbUrl = CONFIG.NODE_ENV === "production"
        ? CONFIG.MONGODB_URL
        : CONFIG.MONGODB_Local_URL;

        const conn = await mongoose.connect(`${dbUrl}/${DB_NAME}`);

        console.log(`MongoDB connected successfully`);
    } catch (error) {
        console.error(`Error is: ${error.message}`);
        process.exit(1);
    }
}

export default connectDatabase;