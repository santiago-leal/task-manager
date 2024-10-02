import { Router } from "express";
import User from "../controllers/user/user.controller";

const router = Router();
const user = new User();

router.get("/login", user.login)
router.post("/register", user.register)

export default router;