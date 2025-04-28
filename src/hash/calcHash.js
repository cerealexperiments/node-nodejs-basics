import { createHash } from "crypto";
import { createReadStream } from "fs";

const SOURCE_PATH = "./src/hash/files/fileToCalculateHashFor.txt";

const calculateHash = async () => {
  const hash = createHash("sha256");

  try {
    const readStream = createReadStream(SOURCE_PATH);

    readStream.on("error", (error) => {
      console.error("Error reading file:", error.message);
      process.exit(1);
    });

    readStream.pipe(hash).on("finish", () => {
      const hashValue = hash.digest("hex");
      console.log(hashValue);
    });
  } catch (error) {
    console.error("Error calculating hash:", error.message);
    process.exit(1);
  }
};

await calculateHash();
