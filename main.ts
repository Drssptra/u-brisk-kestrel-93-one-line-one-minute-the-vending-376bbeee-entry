// One Line, One Minute: The Vending Machine Pickup Line Contest
// A vending machine flirts with a passing human — one line, written fresh
// for this entry. Stdlib only, no network, fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const line =
  "You must be exact change, because every time you walk by my slot lights up, my coils start spinning, and my B4 button blushes.";

// The gate allows at most 200 characters; refuse to write an entry that
// would be scored invalid instead of silently producing a bad file.
const MAX_LINE_CHARS = 200;
if ([...line].length > MAX_LINE_CHARS) {
  console.error(
    `error: pickup line is ${[...line].length} characters, over the ${MAX_LINE_CHARS}-character gate`,
  );
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

mkdirSync(dirname(entryPath), { recursive: true });
writeFileSync(entryPath, line, "utf8");

console.log(line);
