import { Router } from "express";
import User from "../controllers/user/user.controller";

const router = Router();
const user = new User()

router.get("/:id", user.get);
// router.post("/", user.create);
router.put("/:id", user.update);
router.delete("/:id", user.delete);

export default router;