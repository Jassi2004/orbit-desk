import { test } from "node:test";
import assert from "node:assert/strict";
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
