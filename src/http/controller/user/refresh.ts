import { FastifyReply, FastifyRequest, type FastifyInstance } from "fastify";
import { PrismaUserRepository } from "repositories/user/prisma-user-repository";
import { RefreshUseCase } from "use-cases/user/refresh-use-case";

// import { makeAuthenticateUseCaseFactory } from 'factories/use-cases/session/make-authenticate-factory'

export async function RefreshController(
  app: FastifyInstance,
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const refreshToken = req.cookies.refreshToken;

    const decoded = app.jwt.decode(refreshToken as string) as { sub: string };

    const userRepository = new PrismaUserRepository();
    const refreshUseCase = new RefreshUseCase(userRepository);
    const { user } = await refreshUseCase.execute({ id: decoded.sub });

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "30m",
        },
      }
    );

    const newRefreshToken = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );
    // Configura o novo cookie
    res
      .setCookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: true,
        path: "/session/refresh",
      })
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
