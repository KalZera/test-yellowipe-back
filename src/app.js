"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_1 = __importDefault(require("@fastify/cookie"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cors_1 = __importDefault(require("@fastify/cors"));
const env_1 = require("env");
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("http/controller/user/routes");
const routes_2 = require("http/controller/post/routes");
const app = (0, fastify_1.default)();
app.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify();
    }
    catch (err) {
        reply.send(err);
    }
});
app.register(cors_1.default, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
});
app.register(jwt_1.default, {
    secret: env_1.env.JWT_SECRET_KEY,
    cookie: {
        cookieName: "refreshToken",
        signed: false,
    },
    sign: {
        expiresIn: "30m",
    },
});
app.register(cookie_1.default);
app.register(routes_1.UserRoutes);
app.register(routes_2.PostRoutes);
exports.default = app;
