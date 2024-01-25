import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
    },
});

const CatagorySchema = mongoose.model("Category", CategorySchema);

export default CatagorySchema;
