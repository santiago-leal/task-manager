import { Router } from "express";
import { getTasks, getTaskById, createTask, deleteTask, updateTask } from "../controllers/task/task.controller"

const router = Router();

router.post("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", deleteTask);
router.delete("/:id", updateTask);

export default router;