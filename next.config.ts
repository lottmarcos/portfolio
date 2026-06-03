import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this directory: it is a git worktree, so a
  // lockfile also exists at the main repo root and Turbopack would otherwise
  // warn about ambiguous root inference.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
