import type { FastifyReply, FastifyRequest } from "fastify";
import { CreatePostUseCase } from "use-cases/post/create-post-use-case";

import { z } from "zod";

export async function createPostController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const createPostBodySchema = z.object({
    content: z.string(),
  });

  const { content } = createPostBodySchema.parse(req.body);

  try {
    const { sub: id } = req.user;
    const createPostUseCase = new CreatePostUseCase();

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
