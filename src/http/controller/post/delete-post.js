"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostController = deletePostController;
const delete_post_use_case_1 = require("use-cases/post/delete-post-use-case");
const zod_1 = require("zod");
async function deletePostController(req, res) {
    const deletePostQuerySchema = zod_1.z.object({
        postId: zod_1.z.coerce.number(),
    });
    const { postId } = deletePostQuerySchema.parse(req.params);
    try {
        const userId = req.user.sub; // Assuming the user ID is stored in the request after JWT verification
        const deletePostUseCase = new delete_post_use_case_1.DeletePostUseCase();
        await deletePostUseCase.execute({
            userId,
            postId,
        });
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error" });
    }
}
