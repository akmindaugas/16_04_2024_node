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
// trinant item pagal id, id paduodame per url, todel jis yra imamas is params, ne body

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
export const GET_ALL_USERS_ITEMS = async (req, res) => {
  try {
    const items = await ItemModel.find({
      userId: req.body.userId,
    });

    if (!items.length) {
      return res.status(404).json({ message: "no items found for you" });
    }

    return res.status(200).json({ items: items });
  } catch (err) {
    console.log(err);
  }
};
export const DELETE_ITEM_BY_ID = async (req, res) => {
  try {
    const item = await ItemModel.findOne({ id: req.params.id });

    if (!item.userId !== req.body.userId) {
      return res
        .status(401)
        .json({ message: "you try delete item belongs not for you" });
    }

    return res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
  }
};
