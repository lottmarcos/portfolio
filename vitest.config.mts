import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    // Default to node — current tests are pure logic. Component tests can opt
    // into jsdom per-file with `// @vitest-environment jsdom` once the broken
    // jsdom dependency chain (html-encoding-sniffer → @exodus/bytes ESM) is
    // resolved.
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
  },
});
