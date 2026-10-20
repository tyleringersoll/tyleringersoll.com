import { spawnSync, spawn } from "node:child_process";

// Nuxt Fonts' Storybook middleware does not receive a full H3 event. Serve the
// real generated font files through Storybook's static middleware instead.
const prepare = spawnSync("npm", ["run", "generate:site"], {
  stdio: "inherit",
});
if (prepare.error) throw prepare.error;
if (prepare.status !== 0) process.exit(prepare.status ?? 1);
const server = spawn(
  "npm",
  [
    "exec",
    "--",
    "storybook",
    "dev",
    "-p",
    "6006",
    "--no-open",
    ...process.argv.slice(2),
  ],
  { stdio: "inherit", env: { ...process.env, STORYBOOK: "true" } },
);
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.kill(signal));
}
server.on("error", (error) => {
  throw error;
});
server.on("exit", (code) => process.exit(code ?? 0));
