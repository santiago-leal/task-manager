import User from "../../../database/models/users.model"
import UserInterface from "../../user.interface"

export default interface UserRepositoryInterface {
  findAll(): Promise<User[]>
  findById(id: number): Promise<User | null>
  find(email: string): Promise<User | null> 
  create(user: UserInterface): Promise<User>
  update(id: number, user: UserInterface): Promise<User | null>
  delete(id: number): Promise<boolean>
}