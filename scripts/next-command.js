const { spawnSync } = require("child_process");

const command = process.argv[2];
const args = process.argv.slice(3);

if (!command) {
  console.error("Missing Next.js command.");
  process.exit(1);
}

const nextBin = require.resolve("next/dist/bin/next");
const env = {
  ...process.env,
  NODE_ENV: command === "dev" ? "development" : "production",
};

const result = spawnSync(process.execPath, [nextBin, command, ...args], {
  env,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
