"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionController = sessionController;
const authenticate_use_case_1 = require("use-cases/user/authenticate-use-case");
const zod_1 = require("zod");
// import { makeAuthenticateUseCaseFactory } from 'factories/use-cases/session/make-authenticate-factory'
async function sessionController(req, res) {
    const sessionBodySchema = zod_1.z.object({
        email: zod_1.z.email(),
        password: zod_1.z.string().min(6),
    });
    const { email, password } = sessionBodySchema.parse(req.body);
    try {
        const authenticateUseCase = new authenticate_use_case_1.AuthenticateUseCase();
        const { user } = await authenticateUseCase.execute({ email, password });
        const token = await res.jwtSign({}, {
            sign: {
                sub: user.id,
                expiresIn: "30m",
            },
        });
        const refreshToken = await res.jwtSign({}, {
            sign: {
                sub: user.id,
                expiresIn: "7d",
            },
        });
        return res
            .setCookie("refreshToken", refreshToken, {
            path: "/",
            secure: true,
            sameSite: true,
            httpOnly: true,
        })
            .status(200)
            .send({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
}
