import express from "express";
import {
  GET_ALL_ITEMS,
  INSERT_ITEM,
  GET_ITEM_BY_ID,
  GET_ALL_USERS_ITEMS,
  DELETE_ITEM_BY_ID,
} from "../controllers/item.js";

import { auth } from "../middlewares/auth.js";

// per si routeri kuriame visu endpointus
const router = express.Router();

router.get("/items", GET_ALL_ITEMS);
router.get("/items/:id", GET_ITEM_BY_ID);
router.post("/items", INSERT_ITEM);
router.get("/items/user", GET_ALL_USERS_ITEMS);
router.delete("/items/:id", DELETE_ITEM_BY_ID);

export default router;
