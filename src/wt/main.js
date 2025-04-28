import { Worker } from "worker_threads";
import { cpus } from "os";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const cpuCores = cpus().length;
  const workers = [];
  const results = [];

  for (let i = 0; i < cpuCores; i++) {
    const worker = new Worker(path.join(__dirname, "worker.js"));
    workers.push(worker);

    const promise = new Promise((resolve) => {
      worker.on("message", (result) => {
        resolve(result);
      });
      worker.on("error", () => {
        resolve({ status: "error", data: null });
      });
      worker.on("exit", (code) => {
        if (code !== 0) {
          resolve({ status: "error", data: null });
        }
      });
    });

    results.push(promise);
    worker.postMessage(10 + i);
  }

  const settledResults = await Promise.all(results);
  console.log(settledResults);
};

await performCalculations();
