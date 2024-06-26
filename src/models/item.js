import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  photoUrl: { type: String, required: false },
});

export default mongoose.model("Item", itemSchema);
