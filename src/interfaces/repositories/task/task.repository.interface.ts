import Note from "../../../database/models/tasks.model";
import TaskInterface from "../../task.interface";

export default interface TaksRepositoryInterface {
  findAll(): Promise<Note[]>
  findById(id: number): Promise<Note | null>
  create(task: TaskInterface): Promise<Note>
  update(id: number, task: TaskInterface): Promise<Note | null>
  delete(id: number): Promise<boolean>
}