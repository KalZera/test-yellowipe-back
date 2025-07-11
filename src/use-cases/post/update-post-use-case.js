"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostUseCase = void 0;
const prisma_1 = require("lib/prisma");
class UpdatePostUseCase {
    async execute({ userId, postId, content, }) {
        const existingPost = await prisma_1.prisma.post.findUnique({
            where: { id: postId },
        });
        if (!existingPost) {
            throw new Error("Post not found");
        }
        if (existingPost.authorId !== userId) {
            throw new Error("You do not have permission to update this post, you are not the author.");
        }
        const post = await prisma_1.prisma.post.update({
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
exports.UpdatePostUseCase = UpdatePostUseCase;
