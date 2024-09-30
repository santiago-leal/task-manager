import {Request, Response } from "express"
import UserInterface from "../../interfaces/user.interface"
import UserRepository from "../../repositories/user/user.repository"
import UserControllerInterface from "../../interfaces/controllers/user/user.controller.interface"

const userRepository = new UserRepository()

export default class User implements UserControllerInterface {
  async login(req: Request, res: Response): Promise<Response> {
    const {email, password} = req.body
    const user = await userRepository.find(email)
    return res.json(user)
  }

  get = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)
  
    try {
      const user = await userRepository.findById(id)
      return res.json(user)
    } catch (e) {
      return res.status(404).json({message: "User not found"})
    }
  }
  
  create = async (req: Request, res: Response) => {
    try {
      const userData: UserInterface = req.body
      const user = await userRepository.create(userData)
      return res.json(user)
    } catch (e) {
      return res.status(400).json({message: "Error creating user"})
    }
  }
  
  update = async (req: Request, res: Response) => {  
    try {
      const id = parseInt(req.params.id)
      const userData: UserInterface = req.body
      await userRepository.update(id, userData)
      return res.json({ message: "User updated" })
    } catch (e) {
      return res.status(400).json({ message: "User not found" })
    }
  }
  
  delete = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
  
    try {
      await userRepository.delete(id)
      return res.json({ message: "User deleted" })
    } catch (e) {
      return res.status(404).json({message: "User not found"})
    }
  }
}