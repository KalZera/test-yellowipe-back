"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = verifyJWT;
async function verifyJWT(app, request, reply) {
    try {
        await request.jwtVerify();
        const decoded = app.jwt.decode(request.headers.authorization.replace("Bearer ", ""));
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = decoded.exp - now;
        console.log("Token expires in:", expiresIn, "seconds");
        if (expiresIn < 300) {
            const newToken = await reply.jwtSign({
                ...decoded,
                iat: now,
                exp: now + 1800, // 30 minutos a partir de agora
            });
            reply.header("x-new-token", newToken);
        }
    }
    catch (error) {
        return reply.status(401).send({ message: "Unauthorized" });
    }
}
