// src/index.js
import * as express from "express";
import { Express } from "express";
import * as dotenv from "dotenv";
import router from "./routes/routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import validateToken from "./middleware/validate.token.middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", router)

app.use(validateToken)
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});