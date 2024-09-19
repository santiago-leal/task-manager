import { Response, Request } from "express"
import TaskInterface from "../../interfaces/task.interface"
import TaksRepository from "../../repositories/task/task.repository"

const taksRepository = new TaksRepository()

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = taksRepository.findAll()
    return res.json(tasks)
  } catch (error) {
    return res.status(400).json({ message: "Error getting tasks" })
  }
}

export const getTaskById = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const task = taksRepository.findById(id)

    return res.json(task)
  } catch (error) {
    
  }
}

export const createTask = async (req: Request, res: Response) => {
  const { user_id, title, content } = req.body
  const userId = user_id
  const note = await taksRepository.create({ userId, title, content })
  
  res.send(note)
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const { user_id, title, content } = req.body
    const userId = user_id
    await taksRepository.update(id, { userId, title, content })

    res.json({ message: "Task updated" })
  } catch (error) {
    return res.status(404).json({ message: "Task not found" })
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    await taksRepository.delete(id)

    return res.json({ message: "Task deleted" })
  } catch (error) {
    return res.status(404).json({ message: "Task not found" })
  }
}
