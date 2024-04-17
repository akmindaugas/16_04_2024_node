import express from "express";
import {
  GET_ALL_ITEMS,
  INSERT_ITEM,
  GET_ITEM_BY_ID,
} from "../controllers/item.js";

import { auth } from "../middlewares/auth.js";

// per si routeri kuriame visu endpointus
const router = express.Router();

router.get("/items", GET_ALL_ITEMS);
router.post("/items", auth, INSERT_ITEM);
router.get("/items/:id", GET_ITEM_BY_ID);

export default router;
