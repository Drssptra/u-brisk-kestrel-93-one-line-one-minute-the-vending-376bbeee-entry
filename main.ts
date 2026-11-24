// One Line, One Minute: The Vending Machine Pickup Line Contest
// A vending machine flirts with a passing human — one line, written fresh
// for this entry. Stdlib only, no network, fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const line =
  "You must be exact change, because every time you walk by my slot lights up, my coils start spinning, and my B4 button blushes.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

mkdirSync(dirname(entryPath), { recursive: true });
writeFileSync(entryPath, line, "utf8");

console.log(line);
