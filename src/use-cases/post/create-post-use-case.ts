import { hash } from "bcryptjs";
import { Post } from "generated/prisma";
import { prisma } from "lib/prisma";
import type { PostRepository } from "repositories/post/post-repository";

interface CreatePostUseCaseInput {
  authorId: string;
  content: string;
}

interface CreatePostUseCaseOutput {
  post: Partial<Post>;
}

export class CreatePostUseCase {
  constructor(private postRepository: PostRepository) {}
  async execute({
    authorId,
    content,
  }: CreatePostUseCaseInput): Promise<CreatePostUseCaseOutput> {
    if (content.trim().length === 0) {
      throw new Error("Content cannot be empty");
    }

    const post = await this.postRepository.create({
      authorId,
      content,
    });

    return {
      post,
    };
  }
}
