import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
const script = new URL("../scripts/security-policy.mjs", import.meta.url);
function run(value) {
  const cwd = mkdtempSync(join(tmpdir(), "orbit-sast-policy-"));
  try {
    if (value !== undefined) writeFileSync(join(cwd, "gl-sast-report.json"), typeof value === "string" ? value : JSON.stringify(value));
    return spawnSync(process.execPath, [script.pathname], { cwd, encoding: "utf8" });
  } finally { rmSync(cwd, { recursive: true, force: true }); }
}
const report = vulnerabilities => ({ scan: { type: "sast", status: "success" }, vulnerabilities });
test("native policy accepts successful clean reports and explicitly allows lower severities", () => {
  assert.equal(run(report([])).status, 0);
  assert.equal(run(report([{ severity: "Low" }, { severity: "Medium" }])).status, 0);
});
test("native policy blocks High and Critical findings with source locations", () => {
  for (const severity of ["High", "Critical"]) {
    const result = run(report([{ severity, name: "Unsafe evaluation", location: { file: "src/report-preview.js", start_line: 4 } }]));
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /src\/report-preview.js:4/);
  }
});
test("missing, malformed and failed native evidence cannot pass the policy", () => {
  for (const value of [undefined, "not-json", {}, { scan: { type: "sast", status: "failure" }, vulnerabilities: [] }, { scan: { type: "other", status: "success" }, vulnerabilities: [] }]) assert.notEqual(run(value).status, 0);
});
