"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchPostUseCase = void 0;
const prisma_1 = require("lib/prisma");
class FetchPostUseCase {
    async execute({ page = 1, size = 10, }) {
        const posts = await prisma_1.prisma.post.findMany({
            take: Number(size),
            skip: (page - 1) * size,
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
        return {
            posts,
        };
    }
}
exports.FetchPostUseCase = FetchPostUseCase;
