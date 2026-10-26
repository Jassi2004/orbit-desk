import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("GitLab release artifact labels the three-seat price as monthly", async () => {
  const html = await readFile("dist/index.html", "utf8");
  assert.match(html, /per month · 3 seats/, "The $108 price is monthly, not annual.");
});
