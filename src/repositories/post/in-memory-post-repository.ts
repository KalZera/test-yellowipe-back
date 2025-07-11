import type { Post, Prisma } from "generated/prisma";
import { PostRepository } from "./post-repository";

export class InMemoryPostRepository implements PostRepository {
  public items: Post[] = [];
  async findById(id: number): Promise<Post | null> {
    const post = this.items.find((item) => item.id === id) || null;
    return post;
  }
  async fetchPosts(page: number, limit: number): Promise<Post[]> {
    return this.items.slice((page - 1) * limit, page * limit);
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
  async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    const newPost = {
      id: data.id || this.items.length + 1,
      ...data,
      authorId: data.authorId,
      published: true,
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
