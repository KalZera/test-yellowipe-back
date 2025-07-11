"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = registerController;
const register_use_case_1 = require("use-cases/user/register-use-case");
const zod_1 = require("zod");
async function registerController(req, res) {
    const registerBodySchema = zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.email(),
        password: zod_1.z.string().min(6),
    });
    const { name, email, password } = registerBodySchema.parse(req.body);
    try {
        const registerUseCase = new register_use_case_1.RegisterUseCase();
        // Call the use case
        await registerUseCase.execute({
            name,
            email,
            password,
        });
        return res.status(201).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error" });
    }
}
