import { mkdir, writeFile } from "node:fs/promises";
import { renderHomePage } from "../src/page.js";

await mkdir("dist", { recursive: true });
await writeFile("dist/index.html", renderHomePage());
console.log("Built Orbit Desk homepage → dist/index.html");
