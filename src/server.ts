import { env } from "env";
import app from "./app";
import "dotenv/config";

app.listen({ port: env.PORT }, () => {
  console.log(`Server listening at ${env.PORT}`);
});
