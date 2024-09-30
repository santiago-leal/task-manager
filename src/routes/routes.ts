import { Router } from "express";
import User from "../controllers/user/user.controller";

const router = Router();
const user = new User();

router.get("/login", user.login)
router.post("/create-account", user.create)

export default router;