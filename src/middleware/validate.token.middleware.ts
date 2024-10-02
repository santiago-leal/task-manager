import { verify } from "jsonwebtoken"
import {Request, Response, NextFunction } from "express"

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("token")

  if (!token) {
    return res.status(400).json({
      message: "Token is required"
    })
  }

  verify(token, process.env.KEY!, (err, user) => {
    if (err) {
      return res.status(400).json({message: "Invalid token"})
    }

    next()

  })
}

export default validateToken