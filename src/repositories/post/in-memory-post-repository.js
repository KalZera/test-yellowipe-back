"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPostRepository = void 0;
class PrismaPostRepository {
    items = [];
    async findById(id) {
        const post = this.items.find((item) => item.id === id) || null;
        return post;
    }
    async fetchPosts(page, limit) {
        return this.items;
    }
    async delete(id) {
        this.items = this.items.filter((item) => item.id !== id);
        return;
    }
    async save(post) {
        const postIndex = this.items.findIndex((p) => p.id === post.id);
        if (postIndex >= 0) {
            this.items[postIndex] = post;
        }
        return post;
    }
    async create(data) {
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
exports.PrismaPostRepository = PrismaPostRepository;
