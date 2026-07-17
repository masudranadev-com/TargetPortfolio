const { spawnSync } = require("child_process");

const command = process.argv[2];
const args = process.argv.slice(3);

if (!command) {
  console.error("Missing Next.js command.");
  process.exit(1);
}

process.env.NODE_ENV = command === "dev" ? "development" : "production";

const executable = process.platform === "win32" ? "next.cmd" : "next";
const result = spawnSync(executable, [command, ...args], {
  env: process.env,
  shell: true,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
