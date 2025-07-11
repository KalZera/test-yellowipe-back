"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostUseCase = void 0;
const prisma_1 = require("lib/prisma");
class CreatePostUseCase {
    async execute({ authorId, content, }) {
        const post = await prisma_1.prisma.post.create({
            data: {
                authorId,
                content,
            },
        });
        return {
            post,
        };
    }
}
exports.CreatePostUseCase = CreatePostUseCase;
