import { totalMonthlyCents } from "./billing.js";

export function renderHomePage() {
  const price = (totalMonthlyCents(3) / 100).toFixed(2);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Orbit Desk</title>
  <style>
    :root { color-scheme: dark; font: 17px/1.6 system-ui, sans-serif; background: #080d17; color: #e2e8f0; }
    body { min-height: 100vh; margin: 0; display: grid; place-items: center; }
    main { max-width: 660px; padding: 48px; border: 1px solid #27344c; border-radius: 24px; background: #101827; }
    p { color: #94a3b8; } h1 { margin: 0; font-size: clamp(2rem, 5vw, 3.5rem); letter-spacing: -.05em; }
    strong { display: block; font-size: 2.5rem; color: #a5b4fc; } small { color: #94a3b8; }
  </style>
</head>
<body><main>
  <p>ORBIT DESK</p><h1>A calmer workspace for your team.</h1>
  <p>Simple seat billing. Three seats include our 10% team discount.</p>
  <strong data-testid="team-price">$${price}</strong><small>per month · 3 seats</small>
</main></body></html>`;
}
