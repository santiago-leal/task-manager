import { Response, Request } from "express"
import TaskInterface from "../../interfaces/task.interface"
import TaksRepository from "../../repositories/task/task.repository"
import TaskControllerInterface from "../../interfaces/controllers/task/task.controller.interface"

const taksRepository = new TaksRepository()

export default class Task implements TaskControllerInterface{
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)
      const task = await taksRepository.findById(id)
  
      return res.json(task)
    } catch (error) {
      return res.status(400).json({message: "Error was ocurred"})
    }
  }

  list = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tasks = await taksRepository.findAll()
      return res.json(tasks)
    } catch (error) {
      return res.status(400).json({ message: "Error getting tasks" })
    }
  }
  
  create = async (req: Request, res: Response): Promise<Response> => {
    const { user_id, title, content } = req.body
    const userId = user_id
    const note = await taksRepository.create({ userId, title, content })
    
    return res.send(note)
  }
  
  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)
      const { user_id, title, content } = req.body
      const userId = user_id
      await taksRepository.update(id, { userId, title, content })
  
      return res.json({ message: "Task updated" })
    } catch (error) {
      return res.status(404).json({ message: "Task not found" })
    }
  }
  
  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)
      await taksRepository.delete(id)
  
      return res.json({ message: "Task deleted" })
    } catch (error) {
      return res.status(404).json({ message: "Task not found" })
    }
  }

}

