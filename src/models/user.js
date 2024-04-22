import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    // lowercase: true,
    unique: true,
  },
  password: { type: String, required: true },
  items: { type: Array, required: false },
  money: { type: Number, required: true },
  boughtItems: [],
});

export default mongoose.model("User", userSchema);
