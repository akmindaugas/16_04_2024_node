import express from "express";
import { SIGN_IN, LOG_IN, GET_REFRESH_TOKEN } from "../controllers/user.js";

// per si routeri kuriame visu endpointus
const router = express.Router();

router.post("/users", SIGN_IN);
router.post("/users/login", LOG_IN);
router.post("/users/login/refresh", GET_REFRESH_TOKEN);

export default router;
