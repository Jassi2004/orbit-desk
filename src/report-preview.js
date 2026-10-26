/** Demo-only route adapter. Orbit's static homepage does not register or expose this route. */

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
    const preview = parsePreview(String(req.query.payload || "{}"));
    const title = req.query.titleExpression
      ? eval(String(req.query.titleExpression))
      : preview.title || "Orbit report";
    res.json({ title: String(title) });
  });
}
