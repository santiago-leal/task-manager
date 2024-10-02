import {Request, Response } from "express"

export default interface UserControllerInterface {
  login(req: Request, res: Response): Promise<Response>
  register(req: Request, res: Response): Promise<Response>
  get(req: Request, res: Response): Promise<Response>
  update(req: Request, res: Response): Promise<Response>
  delete(req: Request, res: Response): Promise<Response>
}