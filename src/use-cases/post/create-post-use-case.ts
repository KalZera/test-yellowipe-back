import { hash } from "bcryptjs";
import { Post } from "generated/prisma";
import { prisma } from "lib/prisma";

interface CreatePostUseCaseInput {
  authorId: string;
  content: string;
}

interface CreatePostUseCaseOutput {
  post: Partial<Post>;
}

export class CreatePostUseCase {
  async execute({
    authorId,
    content,
  }: CreatePostUseCaseInput): Promise<CreatePostUseCaseOutput> {
    const post = await prisma.post.create({
      data: {
        authorId,
        content,
      },
    });

    return {
      post,
    };
  }
}
