import type { DecodePayloadType } from "@fastify/jwt";
import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

export async function verifyJWT(
  app: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();

    const decoded = app.jwt.decode(
      (request.headers.authorization as string).replace("Bearer ", "")
    ) as DecodePayloadType;
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = (decoded as { exp: number }).exp - now;
    console.log("Token expires in:", expiresIn, "seconds");
    if (expiresIn < 300) {
      const newToken = await reply.jwtSign({
        ...(decoded as object),
        iat: now,
        exp: now + 1800, // 30 minutos a partir de agora
      });

      reply.header("x-new-token", newToken);
    }
  } catch (error) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
