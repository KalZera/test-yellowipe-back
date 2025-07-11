"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = PostRoutes;
const jwt_middleware_1 = require("../../middleware/jwt-middleware");
const create_post_1 = require("./create-post");
const fetch_posts_1 = require("./fetch-posts");
const update_post_1 = require("./update-post");
const delete_post_1 = require("./delete-post");
async function PostRoutes(app) {
    app.addHook("onRequest", jwt_middleware_1.verifyJWT.bind(null, app));
    app.post("/post", create_post_1.createPostController);
    app.get("/post", fetch_posts_1.fetchPostController);
    app.put("/post/:postId", update_post_1.updatePostController);
    app.delete("/post/:postId", delete_post_1.deletePostController);
}
