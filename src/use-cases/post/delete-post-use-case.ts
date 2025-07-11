import { hash } from "bcryptjs";
import { Post } from "generated/prisma";
import { prisma } from "lib/prisma";

interface DeletePostUseCaseInput {
  userId: string;
  postId: number;
}

export class DeletePostUseCase {
  async execute({ userId, postId }: DeletePostUseCaseInput): Promise<void> {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    if (existingPost.authorId !== userId) {
      throw new Error(
        "You do not have permission to delete this post, you are not the author.",
      );
    }
    await prisma.post.delete({
      where: { id: postId },
    });

    return;
  }
}
