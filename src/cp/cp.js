import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const spawnChildProcess = async (args) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const scriptPath = path.join(__dirname, "files", "script.js");

  try {
    const childProcess = spawn("node", [scriptPath, ...args], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    process.stdin.pipe(childProcess.stdin);

    childProcess.stdout.pipe(process.stdout);

    childProcess.stderr.on("data", (data) => {
      console.error(`Child process error: ${data}`);
    });

    childProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Child process exited with code ${code}`);
      }
    });

    return childProcess;
  } catch (error) {
    console.error("Error spawning child process:", error.message);
    process.exit(1);
  }
};

spawnChildProcess(["argument1", "argument2", "argument3", "argument4"]);
