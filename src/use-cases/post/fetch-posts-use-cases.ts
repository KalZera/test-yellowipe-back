import { Post } from "generated/prisma";
import { prisma } from "lib/prisma";

interface FetchPostUseCaseInput {
  page?: number;
  size?: number;
}

interface FetchPostUseCaseOutput {
  posts: Partial<Post>[];
}

export class FetchPostUseCase {
  async execute({
    page = 1,
    size = 10,
  }: FetchPostUseCaseInput): Promise<FetchPostUseCaseOutput> {
    const posts = await prisma.post.findMany({
      take: Number(size),
      skip: (page - 1) * size,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      posts,
    };
  }
}
