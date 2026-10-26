/** Demo-only route adapter. Orbit's static homepage does not register or expose this route. */
export function registerReportPreview(app) {
  app.get("/report-preview", (req, res) => {
    const preview = eval("(" + String(req.query.payload || "{}") + ")");
    res.json({ title: String(preview.title || "Orbit report") });
  });
}
