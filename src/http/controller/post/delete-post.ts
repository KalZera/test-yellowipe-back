import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostRepository } from "repositories/post/prisma-post-repository";
import { DeletePostUseCase } from "use-cases/post/delete-post-use-case";

import { z } from "zod";

export async function deletePostController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const deletePostQuerySchema = z.object({
    postId: z.coerce.number(),
  });
  const { postId } = deletePostQuerySchema.parse(req.params);

  try {
    const userId = req.user.sub;
    const postRepository = new PrismaPostRepository();
    const deletePostUseCase = new DeletePostUseCase(postRepository);
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
