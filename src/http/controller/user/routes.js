"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = UserRoutes;
const register_1 = require("./register");
const session_1 = require("./session");
async function UserRoutes(app) {
    app.post("/register", register_1.registerController);
    app.post("/session", session_1.sessionController);
}
