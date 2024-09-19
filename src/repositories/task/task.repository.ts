import Note from "../../database/models/tasks.model";
import TaksRepositoryInterface from "../../interfaces/repositories/task/task.repository.interface";
import TaskInterface from "../../interfaces/task.interface";

export default class TaksRepository implements TaksRepositoryInterface {
  async findAll(): Promise<Note[]> {
    const tasks = Note.findAll()
    return tasks
  }

  async findById(id: number): Promise<Note | null> {
    const task = Note.findByPk(id)
    if (!task) {
      throw new Error("Task not found")
    }

    return task
  }

  async create(task: {}): Promise<Note> {
    const taskCreated = Note.create(task)
    return taskCreated
  }

  async update(id: number, task: TaskInterface): Promise<Note | null> {
    const taskData = Note.findByPk(id)
    if (!taskData) {
      throw new Error("Task not found")
    }
    await Note.update(task, { where: { id } })
    return taskData
  }

  async delete(id: number): Promise<boolean> {
    const taskData = Note.findByPk(id)
    if (!taskData) {
      throw new Error("Task not found")
    }

    await Note.destroy({ where: { id } })
    return true
  }
}