"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostController = updatePostController;
const update_post_use_case_1 = require("use-cases/post/update-post-use-case");
const zod_1 = require("zod");
async function updatePostController(req, res) {
    const updatePostBodySchema = zod_1.z.object({
        content: zod_1.z.string(),
    });
    const updatePostQuerySchema = zod_1.z.object({
        postId: zod_1.z.coerce.number(),
    });
    const { content } = updatePostBodySchema.parse(req.body);
    const { postId } = updatePostQuerySchema.parse(req.params);
    try {
        const userId = req.user.sub;
        const updatePostUseCase = new update_post_use_case_1.UpdatePostUseCase();
        await updatePostUseCase.execute({
            userId,
            postId,
            content,
        });
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error" });
    }
}
