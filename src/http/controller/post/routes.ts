import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middleware/jwt-middleware";
import { createPostController } from "./create-post";
import { fetchPostController } from "./fetch-posts";
import { updatePostController } from "./update-post";
import { deletePostController } from "./delete-post";

export async function PostRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT.bind(null, app));
  app.post("/post", createPostController);
  app.get("/post", fetchPostController);
  app.put("/post/:postId", updatePostController);
  app.delete("/post/:postId", deletePostController);
}
