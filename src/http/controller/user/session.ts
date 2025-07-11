import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserRepository } from "repositories/user/prisma-user-repository";
import { AuthenticateUseCase } from "use-cases/user/authenticate-use-case";
import { z } from "zod";
import id from "zod/v4/locales/id.cjs";
// import { makeAuthenticateUseCaseFactory } from 'factories/use-cases/session/make-authenticate-factory'

export async function sessionController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const sessionBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = sessionBodySchema.parse(req.body);

  try {
    const userRepository = new PrismaUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);
    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "30m",
        },
      }
    );

    const refreshToken = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

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
  } catch (error) {
    return res.status(400).send({ message: (error as Error).message });
  }
}
