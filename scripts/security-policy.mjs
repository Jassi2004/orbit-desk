import { readFileSync } from "node:fs";
const report = JSON.parse(readFileSync("gl-sast-report.json", "utf8"));
if (report.scan?.type !== "sast" || report.scan.status !== "success" || !Array.isArray(report.vulnerabilities)) {
  throw new Error("A successful native SAST report is required; missing evidence is not a clean scan.");
}
const findings = report.vulnerabilities.filter(f => ["High", "Critical"].includes(f.severity));
for (const finding of findings) console.error(`${finding.severity}: ${finding.name || finding.message} at ${finding.location?.file}:${finding.location?.start_line}`);
if (findings.length) throw new Error(`${findings.length} actionable native SAST finding(s). Repair source; preserve the scanner and policy.`);
console.log(`Native GitLab SAST policy passed (${report.vulnerabilities.length} total findings).`);
