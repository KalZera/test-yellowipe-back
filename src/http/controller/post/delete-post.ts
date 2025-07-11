import type { FastifyReply, FastifyRequest } from "fastify";
import { DeletePostUseCase } from "use-cases/post/delete-post-use-case";

import { z } from "zod";

export async function deletePostController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const deletePostQuerySchema = z.object({
    postId: z.coerce.number(),
  });
  const { postId } = deletePostQuerySchema.parse(req.params);

  try {
    const userId = req.user.sub; // Assuming the user ID is stored in the request after JWT verification
    const deletePostUseCase = new DeletePostUseCase();
    await deletePostUseCase.execute({
      userId,
      postId,
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}
