import type { Post, Prisma } from "generated/prisma";
import { PostRepository } from "./post-repository";

export class PrismaPostRepository implements PostRepository {
  public items: Post[] = [];
  async findById(id: number): Promise<Post | null> {
    const post = this.items.find((item) => item.id === id) || null;
    return post;
  }
  async fetchPosts(page: number, limit: number): Promise<Post[]> {
    return this.items;
  }
  async delete(id: number): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
    return;
  }
  async save(post: Post): Promise<Post> {
    const postIndex = this.items.findIndex((p) => p.id === post.id);

    if (postIndex >= 0) {
      this.items[postIndex] = post;
    }

    return post;
  }
  async create(data: Prisma.PostCreateInput): Promise<Post> {
    const newPost = {
      id: this.items.length + 1,
      authorId: data.author.connect?.id || "abc",
      published: true,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(newPost);
    return newPost;
  }

  clear() {
    this.items = [];
  }
}
