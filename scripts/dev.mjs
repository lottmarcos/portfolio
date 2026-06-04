#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skipDb = process.argv.includes("--next-only");

function supabaseBin() {
  const local = join(root, "node_modules", ".bin", "supabase");
  if (existsSync(local) || existsSync(`${local}.cmd`)) return local;
  return "supabase";
}

function parseEnvOutput(stdout) {
  const vars = {};
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    let value = trimmed.slice(eq + 1);
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    vars[key] = value;
  }
  return vars;
}

function mapSupabaseEnv(statusVars) {
  const url = statusVars.API_URL;
  const anon = statusVars.ANON_KEY;
  const service = statusVars.SERVICE_ROLE_KEY;
  if (!url || !anon || !service) {
    console.error(
      "Could not read API_URL, ANON_KEY, or SERVICE_ROLE_KEY from `supabase status -o env`.",
    );
    console.error("Is Docker running? Try: yarn db:status");
    process.exit(1);
  }
  return {
    NEXT_PUBLIC_SUPABASE_URL: url,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anon,
    SUPABASE_SERVICE_ROLE_KEY: service,
  };
}

function runSupabaseStart() {
  const bin = supabaseBin();
  console.log("Starting local Supabase (Docker)…");
  const result = spawnSync(bin, ["start"], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });
  if (result.status !== 0) {
    console.error(
      "\nSupabase failed to start. Ensure Docker Desktop is running, then retry `yarn dev`.",
    );
    process.exit(result.status ?? 1);
  }
}

function readSupabaseEnv() {
  const bin = supabaseBin();
  const result = spawnSync(bin, ["status", "-o", "env"], {
    cwd: root,
    encoding: "utf8",
    env: process.env,
  });
  if (result.status !== 0) {
    console.error("Could not read `supabase status -o env`.");
    process.exit(result.status ?? 1);
  }
  return mapSupabaseEnv(parseEnvOutput(result.stdout));
}

function startNext(extraEnv) {
  const nextBin = join(root, "node_modules", ".bin", "next");
  const env = { ...process.env, ...extraEnv };
  console.log("Starting Next.js (Turbopack)…\n");
  const child = spawn(nextBin, ["dev", "--turbopack"], {
    cwd: root,
    stdio: "inherit",
    env,
  });
  child.on("exit", (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    process.exit(code ?? 0);
  });
}

if (skipDb) {
  startNext({});
} else {
  runSupabaseStart();
  const supabaseEnv = readSupabaseEnv();
  console.log(`Supabase API: ${supabaseEnv.NEXT_PUBLIC_SUPABASE_URL}\n`);
  startNext(supabaseEnv);
}
