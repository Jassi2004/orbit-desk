# Orbit Desk

A tiny team workspace homepage with a real billing function, built to exercise MAYA against three independent CI providers.

Three seats cost **$108.00 per month**: $40 each, with a 10% team discount. Tests assert that business contract rather than a simulated failure flag.

| Provider | Pipeline | What it checks | Configuration |
| --- | --- | --- | --- |
| GitHub Actions | Application tests | Source-level billing unit tests | `.github/workflows/application-tests.yml` |
| GitLab CI | Homepage release contract | The actual generated homepage and advertised price | `.gitlab-ci.yml` → `.gitlab/ci/release-contract.yml` |
| CircleCI | Package contract | Tarball contents and billing behavior imported from the packed module | `.circleci/config.yml` |

Run everything locally with Node.js 24: `npm ci && npm run check`.

Build history: [GitHub Actions](https://github.com/Jassi2004/orbit-desk/actions), [GitLab CI](https://gitlab.com/gitlab-ai-hackathon/transcend-october-2026/43459489/orbit-desk/-/pipelines), and [CircleCI](https://app.circleci.com/pipelines/circleci/AgQNmTqTVFyXYuif6girDu/Lashny9TgrXubHB5VFCcLn). All three checks watch `main`.

GitHub is the canonical source. The GitLab project is a second remote containing the **same Git commits**, so its jobs execute real GitLab CI against exactly the same source revision. This exercise explicitly pushes each test revision to both remotes; it does not pretend that GitLab automatically runs a config found on GitHub. CircleCI is connected directly to GitHub.

MAYA observes the three provider runs inside one company workspace. Intentional regression commits and their later fixes remain in Git history as reproducible learning evidence. No billing credentials, customer data, production payment flow, or deliberate failures in another company are involved.

## Observation replay

Each provider observes the same source revision. This demo keeps unit, release, and package-consumer checks independent so MAYA can route the failing monitor without changing the passing ones.
