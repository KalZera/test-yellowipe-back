import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostRepository } from "repositories/post/prisma-post-repository";
import { FetchPostUseCase } from "use-cases/post/fetch-posts-use-cases";

import { z } from "zod";

export async function fetchPostController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const fetchPostQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
  });
  const { page, limit } = fetchPostQuerySchema.parse(req.query);

  try {
    const postRepository = new PrismaPostRepository();
    const fetchPostUseCase = new FetchPostUseCase(postRepository);

    const { posts } = await fetchPostUseCase.execute({
      page,
      size: limit,
    });

    return res.status(200).send({
      posts,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}
