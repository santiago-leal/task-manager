import { Router } from "express";
import Task from "../controllers/task/task.controller"

const router = Router();
const taskController = new Task()

router.post("/", taskController.create);
router.get("/:id", taskController.get);
router.get("/", taskController.list);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.delete);

export default router;