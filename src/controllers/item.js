import { v4 as uuidv4 } from "uuid";

// taip pat butinas pletinys.js path pabaigoje
import ItemModel from "../models/item.js";

export const GET_ALL_ITEMS = async (req, res) => {
  try {
    const items = await ItemModel.find();

    return res.status(200).json({ items: items });
  } catch (err) {
    console.log(err);
  }
};
export const GET_ITEM_BY_ID = async (req, res) => {
  try {
    const item = await ItemModel.findOne({ id: req.params.id });

    return res.status(200).json({ items: items });
  } catch (err) {
    console.log(err);
  }
};
export const INSERT_ITEM = async (req, res) => {
  try {
    console.log(req.body);
    const item = new ItemModel({
      id: uuidv4(),
      title: req.body.title,
      seller: req.body.seller,
      price: req.body.price,
      photoUrl: req.body.photoUrl,
    });
    const response = await item.save();

    return res
      .status(200)
      .json({ item: response, message: "item was added successfuly" });
  } catch (err) {
    console.log(err);
  }
};
