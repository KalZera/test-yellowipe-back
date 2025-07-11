"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPostRepository = void 0;
const prisma_1 = require("lib/prisma");
class PrismaPostRepository {
    async findById(id) {
        const post = await prisma_1.prisma.post.findUnique({
            where: { id },
        });
        return post;
    }
    async fetchPosts(page, limit) {
        const posts = await prisma_1.prisma.post.findMany({
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
    async delete(id) {
        await prisma_1.prisma.post.delete({
            where: { id },
        });
        return;
    }
    async findByEmail(email) {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    async save(data) {
        const post = await prisma_1.prisma.post.update({
            where: { id: data.id },
            data,
        });
        return post;
    }
    async create(data) {
        const post = await prisma_1.prisma.post.create({
            data,
        });
        return post;
    }
}
exports.PrismaPostRepository = PrismaPostRepository;
