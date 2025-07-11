import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostRepository } from "repositories/post/prisma-post-repository";
import { CreatePostUseCase } from "use-cases/post/create-post-use-case";

import { z } from "zod";

export async function createPostController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const createPostBodySchema = z.object({
    content: z.string(),
  });

  const { content } = createPostBodySchema.parse(req.body);

  try {
    const { sub: id } = req.user;
    const postRepository = new PrismaPostRepository();
    const createPostUseCase = new CreatePostUseCase(postRepository);

    await createPostUseCase.execute({
      authorId: id,
      content,
    });

    return res.status(201).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}
