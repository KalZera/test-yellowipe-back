import type { FastifyInstance } from "fastify";
import { registerController } from "./register";
import { sessionController } from "./session";
import { RefreshController } from "./refresh";

export async function UserRoutes(app: FastifyInstance) {
  app.post("/register", registerController);
  app.post("/session", sessionController);
  app.post("/session/refresh", RefreshController.bind(null, app));
}
