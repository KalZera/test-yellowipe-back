import type { FastifyReply, FastifyRequest } from "fastify";
import { UpdatePostUseCase } from "use-cases/post/update-post-use-case";

import { z } from "zod";

export async function updatePostController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const updatePostBodySchema = z.object({
    content: z.string(),
  });
  const updatePostQuerySchema = z.object({
    postId: z.coerce.number(),
  });

  const { content } = updatePostBodySchema.parse(req.body);
  const { postId } = updatePostQuerySchema.parse(req.params);

  try {
    const userId = req.user.sub;
    const updatePostUseCase = new UpdatePostUseCase();

    await updatePostUseCase.execute({
      userId,
      postId,
      content,
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}
