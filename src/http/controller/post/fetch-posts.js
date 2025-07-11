"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPostController = fetchPostController;
const fetch_posts_use_cases_1 = require("use-cases/post/fetch-posts-use-cases");
const zod_1 = require("zod");
async function fetchPostController(req, res) {
    const fetchPostQuerySchema = zod_1.z.object({
        page: zod_1.z.coerce.number().int().min(1).default(1).optional(),
        limit: zod_1.z.coerce.number().int().min(1).max(100).default(10).optional(),
    });
    const { page, limit } = fetchPostQuerySchema.parse(req.query);
    try {
        const fetchPostUseCase = new fetch_posts_use_cases_1.FetchPostUseCase();
        const { posts } = await fetchPostUseCase.execute({
            page,
            size: limit,
        });
        return res.status(200).send({
            posts,
            page,
            limit,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error" });
    }
}
