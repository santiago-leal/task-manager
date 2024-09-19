import {Request, Response } from "express"
import User from "../../database/models/users.model"
import UserInterface from "../../interfaces/user.interface"
import UserRepository from "../../repositories/user/user.repository"

const userRepository = new UserRepository()

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.findAll()
    return res.json(users)
  } catch (e) {
    return res.status(400).json({message: "Error getting users"})
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  try {
    const user = await userRepository.findById(id)
    return res.json(user)
  } catch (e) {
    return res.status(404).json({message: "User not found"})
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: UserInterface = req.body
    const user = await userRepository.create(userData)
    return res.json(user)
  } catch (e) {
    return res.status(400).json({message: "Error creating user"})
  }
}

export const updateUser = async (req: Request, res: Response) => {  
  try {
    const id = parseInt(req.params.id)
    const userData: UserInterface = req.body
    // const userData = new User({ id, username, email, password })
    await userRepository.update(id, userData)
    return res.json({ message: "User updated" })
  } catch (e) {
    return res.status(400).json({ message: "User not found" })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  try {
    await userRepository.delete(id)
    return res.json({ message: "User deleted" })
  } catch (e) {
    return res.status(404).json({message: "User not found"})
  }
}