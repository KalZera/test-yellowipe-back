import { hash } from "bcryptjs";
import { Post } from "generated/prisma";
import { prisma } from "lib/prisma";
import type { PostRepository } from "repositories/post/post-repository";

interface UpdatePostUseCaseInput {
  userId: string;
  postId: number;
  content: string;
}

interface UpdatePostUseCaseOutput {
  post: Partial<Post>;
}

export class UpdatePostUseCase {
  constructor(private postRepository: PostRepository) {}
  async execute({
    userId,
    postId,
    content,
  }: UpdatePostUseCaseInput): Promise<UpdatePostUseCaseOutput> {
    if (content.trim().length === 0) {
      throw new Error("Content cannot be empty");
    }

    const existingPost = await this.postRepository.findById(postId);

    if (!existingPost) {
      throw new Error("Post not found");
    }

    if (existingPost.authorId !== userId) {
      throw new Error(
        "You do not have permission to update this post, you are not the author."
      );
    }
    const post = await this.postRepository.save({ ...existingPost, content });

    return {
      post,
    };
  }
}
