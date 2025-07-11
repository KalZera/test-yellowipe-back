"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("lib/prisma");
class RegisterUseCase {
    async execute({ password, email, name, }) {
        const password_hash = await (0, bcryptjs_1.hash)(password, 8);
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                passwordHash: password_hash,
            },
        });
        return {
            user,
        };
    }
}
exports.RegisterUseCase = RegisterUseCase;
