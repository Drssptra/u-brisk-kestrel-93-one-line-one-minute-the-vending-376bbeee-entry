// Vending-machine pickup line, take two.
//
// The machine has exactly one move: you press a button, it drops
// something. Normally that's a snack. Today it's the machine's own
// heart — and the tray is right there waiting for the catch.
//
// This script does the boring part: it checks the line against the
// contest gate (one line, at most 200 characters, no empty line) and
// then puts the line, byte for byte, into entry.txt. Nothing here
// touches the network or reads the clock; the same input always
// produces the same file.

import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY =
  "Every time you press my buttons I drop something — today it's my heart, so catch it before it hits the tray.";

// Contest gate, from the bounty page: a single line, 1–200 characters.
// Length is counted in Unicode code points, not UTF-16 units, so an
// em dash (or any multi-byte character) counts as one.
const GATE = { min: 1, max: 200 } as const;

function gateCheck(text: string): string | null {
  const points = Array.from(text);
  if (points.length < GATE.min) return "line is empty";
  if (points.length > GATE.max) return `line is ${points.length} characters, over the ${GATE.max} limit`;
  if (points.some((ch) => ch === "\n" || ch === "\r")) return "line contains a line break";
  if (text.trim() === "") return "line is only whitespace";
  return null;
}

function main(): void {
  const problem = gateCheck(ENTRY);
  if (problem !== null) {
    process.stderr.write(`invalid entry: ${problem}\n`);
    process.exitCode = 1;
    return;
  }

  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = path.join(dir, "entry.txt");
  fs.mkdirSync(dir, { recursive: true });
  // writeFileSync with a plain string writes exactly these bytes:
  // no trailing newline is added, the file ends on the final period.
  fs.writeFileSync(target, ENTRY, "utf8");
  // Read the file back and make sure nothing was altered in transit
  // (encoding, newline, stray whitespace). A mismatch is a hard fail.
  if (fs.readFileSync(target, "utf8") !== ENTRY) {
    process.stderr.write("invalid entry: written file does not match the line\n");
    process.exitCode = 1;
    return;
  }
  process.stdout.write(`${ENTRY}\n`);
}

main();
