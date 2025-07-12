import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { env } from "env";
import fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import { UserRoutes } from "http/controller/user/routes";
import { PostRoutes } from "http/controller/post/routes";

const app = fastify();

app.decorate(
  "authenticate",
  async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  }
);

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposedHeaders: ["x-new-token"],
  credentials: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "30m",
  },
});

app.register(fastifyCookie);
app.register(UserRoutes);
app.register(PostRoutes);

export default app;
