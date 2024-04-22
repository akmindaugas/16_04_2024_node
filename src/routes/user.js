import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  SIGN_IN,
  LOG_IN,
  GET_REFRESH_TOKEN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  USER_BY_ID_BUY_ITEM,
} from "../controllers/user.js";

// per si routeri kuriame visu endpointus
const router = express.Router();

router.post("/users", SIGN_IN);
router.get("/users", auth, GET_ALL_USERS);
router.get("/users/:id", GET_USER_BY_ID);
router.post("/users/login", LOG_IN);
router.post("/users/login/refresh", auth, GET_REFRESH_TOKEN);
router.post("/users/:id/buyItem", USER_BY_ID_BUY_ITEM);
// /* auth above, here!!

export default router;
