import { Router } from "express";
import User from "../controllers/user/user.controller";

const router = Router();
const userController = new User()

router.get("/:id", userController.get);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;