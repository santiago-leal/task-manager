import {Request, Response } from "express"

export default interface TaskControllerInterface {
  get(req: Request, res: Response): Promise<Response>
  list(req: Request, res: Response): Promise<Response>
  create(req: Request, res: Response): Promise<Response>
  update(req: Request, res: Response): Promise<Response>
  delete(req: Request, res: Response): Promise<Response>
}