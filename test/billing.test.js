import { test } from "node:test";
import assert from "node:assert/strict";
import { totalMonthlyCents } from "../src/billing.js";

test("one seat costs $40.00 without a team discount", () => {
  assert.equal(totalMonthlyCents(1), 4000);
});
test("three seats receive exactly the documented 10% discount", () => {
  assert.equal(totalMonthlyCents(3), 10800, "3 × $40 minus 10% must be $108.00");
});
test("discount is rounded once in integer cents", () => {
  assert.equal(totalMonthlyCents(3, 1999), 5397);
});
test("invalid seat counts are rejected", () => {
  for (const seats of [0, -1, 1.5, "3"]) assert.throws(() => totalMonthlyCents(seats), RangeError);
});
