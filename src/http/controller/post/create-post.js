"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostController = createPostController;
const create_post_use_case_1 = require("use-cases/post/create-post-use-case");
const zod_1 = require("zod");
async function createPostController(req, res) {
    const createPostBodySchema = zod_1.z.object({
        content: zod_1.z.string(),
    });
    const { content } = createPostBodySchema.parse(req.body);
    try {
        const { sub: id } = req.user;
        const createPostUseCase = new create_post_use_case_1.CreatePostUseCase();
        await createPostUseCase.execute({
            authorId: id,
            content,
        });
        return res.status(201).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error" });
    }
}
