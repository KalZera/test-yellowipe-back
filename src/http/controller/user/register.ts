import type { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "use-cases/user/register-use-case";

import { z } from "zod";

export async function registerController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = new RegisterUseCase();
    // Call the use case
    await registerUseCase.execute({
      name,
      email,
      password,
    });

    return res.status(201).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}
