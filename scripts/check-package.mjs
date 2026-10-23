import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const directory = await mkdtemp(join(tmpdir(), "orbit-package-"));
try {
  const result = JSON.parse(execFileSync("npm", ["pack", "--json", "--pack-destination", directory], { encoding: "utf8" }))[0];
  const names = result.files.map((file) => file.path);
  for (const file of ["src/billing.js", "src/page.js", "dist/index.html", "README.md"])
    assert.ok(names.includes(file), `Published package is missing ${file}`);
  assert.ok(!names.some((name) => /(^|\/)\.env/.test(name)), "Package must not contain environment files");
  execFileSync("tar", ["-xzf", join(directory, result.filename), "-C", directory]);
  const { totalMonthlyCents } = await import(pathToFileURL(resolve(directory, "package/src/billing.js")).href);
  assert.equal(totalMonthlyCents(3), 10800, "Packaged consumer: 3 seats must cost $108.00 after the 10% discount.");
  console.log("Package contents and installed billing contract passed.");
} finally {
  await rm(directory, { recursive: true, force: true });
}
