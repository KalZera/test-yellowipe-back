import { hash } from "bcryptjs";
import { Post } from "generated/prisma";
import { prisma } from "lib/prisma";

interface UpdatePostUseCaseInput {
  userId: string;
  postId: number;
  content: string;
}

interface UpdatePostUseCaseOutput {
  post: Partial<Post>;
}

export class UpdatePostUseCase {
  async execute({
    userId,
    postId,
    content,
  }: UpdatePostUseCaseInput): Promise<UpdatePostUseCaseOutput> {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    if (existingPost.authorId !== userId) {
      throw new Error(
        "You do not have permission to update this post, you are not the author."
      );
    }

    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        content,
      },
    });

    return {
      post,
    };
  }
}
