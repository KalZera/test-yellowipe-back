import type { Prisma, Post } from "generated/prisma";

export interface PostRepository {
  findById(id: number): Promise<Post | null>;
  fetchPosts(page: number, limit: number): Promise<Post[]>;
  delete(id: number): Promise<void>;
  save(post: Post): Promise<Post>;
  create(data: Prisma.PostCreateInput): Promise<Post>;
}
