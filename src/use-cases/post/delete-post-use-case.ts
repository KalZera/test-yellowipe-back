import { hash } from "bcryptjs";
import { Post } from "generated/prisma";
import { prisma } from "lib/prisma";
import type { PostRepository } from "repositories/post/post-repository";

interface DeletePostUseCaseInput {
  userId: string;
  postId: number;
}

export class DeletePostUseCase {
  constructor(private postRepository: PostRepository) {}
  async execute({ userId, postId }: DeletePostUseCaseInput): Promise<void> {
    const existingPost = await this.postRepository.findById(postId);

    if (!existingPost) {
      throw new Error("Post not found");
    }

    if (existingPost.authorId !== userId) {
      throw new Error(
        "You do not have permission to delete this post, you are not the author."
      );
    }
    await this.postRepository.delete(postId);

    return;
  }
}
