#!/usr/bin/env node
/**
 * Image asset self-heal — runs automatically via `npm run build` (prebuild).
 *
 * Some upload/export channels (zips, CI artifacts, some Go UIs) silently drop
 * binary files while keeping text. To make Netlify builds bulletproof, each
 * JPEG is also stored as base64 *text* in design-assets/base64/. This script
 * verifies every image in its three locations and restores anything that is
 * missing or corrupted from the base64 copy, then validates the SHA-256.
 *
 * Fast path: when all files are intact (normal case) it just prints a green
 * check and costs ~50 ms.
 *
 * Usage:
 *   node scripts/prepare-images.mjs          # verify + restore
 *   node scripts/prepare-images.mjs --check  # verify only (CI-friendly)
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifest = JSON.parse(readFileSync(path.join(root, "scripts/image-manifest.json"), "utf8"));
const checkOnly = process.argv.includes("--check");

const TARGETS = [
  path.join(root, "src/assets/images"), // compiled/deployed set
  path.join(root, "public/images"), // direct-file fallback
  path.join(root, "design-assets/images"), // archival backup
];
const B64_DIR = path.join(root, "design-assets/base64");

const sha256 = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");

let problems = 0;
let restored = 0;
const total = Object.keys(manifest).length * TARGETS.length;

for (const [name, info] of Object.entries(manifest)) {
  const b64Path = path.join(B64_DIR, name.replace(/\.jpg$/, ".b64"));

  for (const targetDir of TARGETS) {
    const file = path.join(targetDir, name);
    const intact = existsSync(file) && sha256(file) === info.sha256;
    if (intact) continue;

    problems += 1;
    const rel = path.relative(root, file);
    if (checkOnly) {
      console.error(`  ✗ ${rel} — ${existsSync(file) ? "checksum mismatch" : "missing"}`);
      continue;
    }
    if (!existsSync(b64Path)) {
      console.error(`  ✗ ${rel} — missing and no base64 source (${path.relative(root, b64Path)} absent)`);
      continue;
    }

    const buffer = Buffer.from(readFileSync(b64Path, "utf8").replace(/\s+/g, ""), "base64");
    mkdirSync(targetDir, { recursive: true });
    writeFileSync(file, buffer);
    const nowOk = sha256(file) === info.sha256;
    if (nowOk) {
      restored += 1;
      console.log(`  ⟳ restored ${rel} (${info.bytes} bytes, SHA-256 verified)`);
    } else {
      console.error(`  ✗ ${rel} — restored but SHA-256 mismatch! Check design-assets/base64.`);
    }
  }
}

if (restored > 0) console.log(`⟳ ${restored} image file(s) reconstructed from base64 text.`);
if (problems === 0) {
  console.log(`✓ Image assets OK — ${total} file locations verified (bundled, public, archive).`);
  process.exit(0);
}
if (!checkOnly && restored === problems) {
  console.log(`✓ Image assets healed — ${problems} missing/corrupt file(s) restored from design-assets/base64.`);
  process.exit(0);
}
console.error(`✗ ${problems - restored} image problem(s) could not be fixed. Ensure design-assets/base64/ committed.`);
process.exit(1);
