"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("lib/prisma");
class AuthenticateUseCase {
    async execute({ email, password, }) {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const doesPasswordMatch = await (0, bcryptjs_1.compare)(password, user.passwordHash);
        if (!doesPasswordMatch) {
            throw new Error("Invalid credentials");
        }
        return {
            user,
        };
    }
}
exports.AuthenticateUseCase = AuthenticateUseCase;
