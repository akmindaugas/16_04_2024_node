import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  seller: { type: String, required: true },
  price: { type: Number, required: true },
  photoUrl: { type: String, required: true },
});

export default mongoose.model("Item", itemSchema);
