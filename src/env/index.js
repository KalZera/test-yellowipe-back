"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "test", "production"])
        .default("development"),
    JWT_SECRET_KEY: zod_1.z.string(),
    DATABASE_URL: zod_1.z
        .string()
        .default("postgresql://postgres:postgres@localhost:5432/ignite-solid-gym?schema=public"),
    PORT: zod_1.z.coerce.number().default(3333),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error("Invalid environment variables", _env.error.format());
    throw new Error("Invalid environment variables");
}
exports.env = _env.data;
