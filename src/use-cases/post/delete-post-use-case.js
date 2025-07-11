"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostUseCase = void 0;
const prisma_1 = require("lib/prisma");
class DeletePostUseCase {
    async execute({ userId, postId }) {
        const existingPost = await prisma_1.prisma.post.findUnique({
            where: { id: postId },
        });
        if (!existingPost) {
            throw new Error("Post not found");
        }
        if (existingPost.authorId !== userId) {
            throw new Error("You do not have permission to delete this post, you are not the author.");
        }
        await prisma_1.prisma.post.delete({
            where: { id: postId },
        });
        return;
    }
}
exports.DeletePostUseCase = DeletePostUseCase;
