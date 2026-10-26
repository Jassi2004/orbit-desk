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
