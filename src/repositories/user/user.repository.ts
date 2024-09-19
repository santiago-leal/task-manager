import UserInterface from "../../interfaces/user.interface";
import UserRepositoryInterface from "../../interfaces/repositories/user/user.repository.interface";
import User from "../../database/models/users.model"

export default class UserRepository implements UserRepositoryInterface {
  async findAll(): Promise<User[]> {
    const users = User.findAll()
    return users
  }

  async findById(id: number): Promise<User | null> {
    const user = await User.findByPk(id)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }

  async create(user: {}): Promise<User> {
    const newUser = await User.create(user)
    return newUser
  }

  async update(id: number, user: UserInterface): Promise<User | null> {
    console.log(`User data: ${JSON.stringify(user)}`)
    
    const userData = await User.findByPk(id)
    if (!userData) {
      throw new Error("User not found")
    }

    await User.update(user, { where: { id } })

    return userData
  }

  async delete(id: number): Promise<boolean> {
    const userData = await User.findByPk(id)
    
    if (!userData) {
      throw new Error("User not found")
    }

    await User.destroy({ where: { id }})
    return true
  }
}