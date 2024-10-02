import * as dotenv from "dotenv";
import {Request, Response } from "express"
import UserRepository from "../../repositories/user/user.repository"
import UserControllerInterface from "../../interfaces/controllers/user/user.controller.interface"
import { hash, compareSync } from "bcrypt"
import { sign } from "jsonwebtoken"

dotenv.config();

const userRepository = new UserRepository()

export default class User implements UserControllerInterface {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const {email, password} = req.body
      const user = await userRepository.find(email)
      if (!user) {
        throw new Error("User not found")
      }

      const userObj = user.get({plain: true})

      if (compareSync(password, userObj.password)) {
        const payload = {
          check: true
        }
        
        const token = sign(payload, process.env.KEY!, {
          expiresIn: process.env.EXPIRATION_TOKEN
        })

        return res.json({
          message: "Authentication successful",
          token
        })
      }

      return res.status(401).json({message: "Unauthorized"})
    } catch {
      return res.status(400).json("Error has ocurred")
    }
  }

  register = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body
      const data = {
        username,
        email,
        password: await hash(password, 15)
      }
      const user = await userRepository.create(data)
      return res.json(user)
    } catch (e) {
      return res.status(400).json({message: "Error creating user"})
    }
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
  
  update = async (req: Request, res: Response) => {  
    try {
      const id = parseInt(req.params.id)
      const userData = req.body
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