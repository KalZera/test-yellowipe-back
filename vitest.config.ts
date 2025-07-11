import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "units-use-cases",
          include: ["src/tests/**"],
          environment: "node",
        },
      },
    ],
  },
});
