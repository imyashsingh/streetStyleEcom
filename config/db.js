import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database is connected");
    } catch (error) {
        console.log(process.env.MONGODB_URL);
        console.log(`ERROR in Database Connection=${error}`);
    }
};

export default connectDb;
