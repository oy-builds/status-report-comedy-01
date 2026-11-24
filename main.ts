import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Weekly status report, one line: progress, blockers, next steps —
// with the twist saved for the last few words. The punchline callbacks
// the report's own "Blockers: none" — the report contradicts itself.
const ENTRY =
  "Progress: all tasks done. Blockers: none. Next steps: I've already done next week's too — honestly, the only blocker left is you.";

const MAX_CHARS = 200;

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`,
    );
  }
  if (/[\r\n]/.test(ENTRY)) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");

  // Read the file back and verify what landed on disk is exactly the entry.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error(`read-back mismatch: ${outPath} differs from entry`);
  }
  console.log(ENTRY);
}

main();
