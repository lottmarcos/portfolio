#!/usr/bin/env node
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

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

function fail(message) {
  console.error(`verify-visitor-tags-db: ${message}`);
  process.exit(1);
}

const status = spawnSync(supabaseBin(), ["status", "-o", "env"], {
  cwd: root,
  encoding: "utf8",
});

if (status.status !== 0) {
  fail(
    "Supabase is not running. Start Docker and run: yarn db:start (or yarn dev)"
  );
}

const env = parseEnvOutput(status.stdout);
const url = env.API_URL;
const serviceKey = env.SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  fail("Could not read API_URL or SERVICE_ROLE_KEY from supabase status");
}

const smoke = `import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  ${JSON.stringify(url)},
  ${JSON.stringify(serviceKey)},
  { auth: { persistSession: false, autoRefreshToken: false } }
);

const { data, error } = await supabase.rpc("record_visitor_mark", {
  p_city: null,
  p_emoji: "🧪",
  p_previous_emoji: null,
});

if (error) {
  console.error(error.message || error);
  process.exit(1);
}
if (!data || typeof data !== "object") {
  console.error("RPC returned no payload");
  process.exit(1);
}
console.log("OK");
`;

const rpc = spawnSync(process.execPath, ["--input-type=module", "-e", smoke], {
  cwd: root,
  encoding: "utf8",
  env: { ...process.env, NODE_PATH: join(root, "node_modules") },
});

if (rpc.status !== 0) {
  const msg = (rpc.stderr || rpc.stdout || "").trim();
  fail(
    msg
      ? `record_visitor_mark failed: ${msg}\nRun: yarn db:reset`
      : "record_visitor_mark failed. Run: yarn db:reset"
  );
}

console.log("visitor-tags DB OK (record_visitor_mark)");
