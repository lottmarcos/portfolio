#!/usr/bin/env node
import { cp, rm, access } from "node:fs/promises";
import { constants } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const reverse = process.argv.includes("--reverse");
const dryRun = process.argv.includes("--dry-run");

const pairs = [
  { name: "agents", subdirs: true },
  { name: "skills", subdirs: true },
];

const srcRoot = reverse ? ".cursor" : ".claude";
const destRoot = reverse ? ".claude" : ".cursor";

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function syncDir(name) {
  const src = join(root, srcRoot, name);
  const dest = join(root, destRoot, name);

  if (!(await exists(src))) {
    console.error(`Missing source: ${src}`);
    process.exit(1);
  }

  if (dryRun) {
    console.log(`[dry-run] ${src} -> ${dest}`);
    return;
  }

  if (await exists(dest)) {
    await rm(dest, { recursive: true, force: true });
  }

  await cp(src, dest, { recursive: true });
  console.log(`Synced ${name}: ${srcRoot}/${name} -> ${destRoot}/${name}`);
}

async function main() {
  const direction = reverse ? "cursor -> claude" : "claude -> cursor";
  console.log(`AI layer sync (${direction})${dryRun ? " [dry-run]" : ""}`);

  for (const { name } of pairs) {
    await syncDir(name);
  }

  if (!dryRun) {
    console.log("Done. Not synced: .cursor/rules, AGENTS.md, mcp.json, settings.json");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
