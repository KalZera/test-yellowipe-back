import type { FastifyInstance } from "fastify";
import { registerController } from "./register";
import { sessionController } from "./session";

export async function UserRoutes(app: FastifyInstance) {
  app.post("/register", registerController);
  app.post("/session", sessionController);
}
