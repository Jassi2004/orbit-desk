import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("release homepage advertises the promised $108 team price", async () => {
  const html = await readFile("dist/index.html", "utf8");
  assert.match(html, /<title>Orbit Desk<\/title>/);
  assert.match(html, /data-testid="team-price">\$108\.00</,
    "The built homepage must show $108.00 for three seats at a 10% discount.");
  assert.match(html, /<html lang="en">/);
});
