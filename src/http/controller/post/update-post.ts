import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostRepository } from "repositories/post/prisma-post-repository";
import { UpdatePostUseCase } from "use-cases/post/update-post-use-case";

import { z } from "zod";

export async function updatePostController(
  req: FastifyRequest,
  res: FastifyReply
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
    const postRepository = new PrismaPostRepository();
    const updatePostUseCase = new UpdatePostUseCase(postRepository);

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
