import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
        {
            id: String,
            title: String,
            price: Number,
            image: String,
            quantity: Number,
        }
    ],
});
export default mongoose.model("User", UserSchema);
