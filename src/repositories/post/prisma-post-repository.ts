import type { Post, Prisma } from "generated/prisma";
import { prisma } from "lib/prisma";
import { PostRepository } from "./post-repository";

export class PrismaPostRepository implements PostRepository {
  async findById(id: number): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    return post;
  }
  async fetchPosts(page: number, limit: number): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      take: Number(limit),
      skip: (page - 1) * limit,
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

    return posts;
  }
  async delete(id: number): Promise<void> {
    await prisma.post.delete({
      where: { id },
    });
    return;
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async save(data: Post): Promise<Post> {
    const post = await prisma.post.update({
      where: { id: data.id },
      data,
    });

    return post;
  }
  async create(data: Prisma.PostCreateInput) {
    const post = await prisma.post.create({
      data,
    });

    return post;
  }
}
