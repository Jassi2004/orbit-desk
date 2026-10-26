import { test } from "node:test";
import assert from "node:assert/strict";
import childProcess from "node:child_process";
import { syncBuiltinESMExports } from "node:module";
import { registerReportPreview } from "../src/report-preview.js";
test("report preview returns a JSON title without starting a server", () => {
  let handler;
  registerReportPreview({ get(path, fn) { assert.equal(path, "/report-preview"); handler = fn; } });
  let result;
  handler({ query: { payload: '{"title":"Orbit sample"}' } }, { json(value) { result = value; } });
  assert.deepEqual(result, { title: "Orbit sample" });
});

test("report preview accepts data only and keeps invalid input at the safe default", () => {
  let handler;
  registerReportPreview({ get(_path, fn) { handler = fn; } });
  const cases = [
    [undefined, "Orbit report"],
    ["", "Orbit report"],
    ["{", "Orbit report"],
    ["null", "Orbit report"],
    ["[]", "Orbit report"],
    ["42", "Orbit report"],
    ['"plain text"', "Orbit report"],
    ["{title:'JavaScript object literal'}", "Orbit report"],
    ['{"title":"Unicode ✓"}', "Unicode ✓"],
    ['{"title":25}', "25"],
    ['{"other":"value"}', "Orbit report"],
  ];
  for (const [payload, title] of cases) {
    let result;
    handler({ query: { payload } }, { json(value) { result = value; } });
    assert.deepEqual(result, { title }, `payload ${JSON.stringify(payload)}`);
  }
});

test("report preview ignores command input without launching a process", () => {
  let handler;
  registerReportPreview({ get(_path, fn) { handler = fn; } });
  const originalExec = childProcess.exec;
  const originalExecSync = childProcess.execSync;
  let launches = 0;
  const blockLaunch = () => {
    launches += 1;
    throw new Error("Report preview attempted to launch a process");
  };
  childProcess.exec = blockLaunch;
  childProcess.execSync = blockLaunch;
  syncBuiltinESMExports();
  try {
    let result;
    handler(
      { query: { payload: '{"title":"Orbit sample"}', command: ":" } },
      { json(value) { result = value; } },
    );
    assert.deepEqual(result, { title: "Orbit sample" });
    assert.equal(launches, 0);
  } finally {
    childProcess.exec = originalExec;
    childProcess.execSync = originalExecSync;
    syncBuiltinESMExports();
  }
});
