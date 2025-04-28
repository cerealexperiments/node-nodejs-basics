import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

const SOURCE_PATH = "./src/zip/files/fileToCompress.txt";
const TARGET_PATH = "./src/zip/files/archive.gz";

const compress = async () => {
  try {
    const readStream = createReadStream(SOURCE_PATH);
    const writeStream = createWriteStream(TARGET_PATH);
    const gzipStream = createGzip();

    readStream.on("error", (error) => {
      console.error("Error reading file:", error.message);
      process.exit(1);
    });

    writeStream.on("error", (error) => {
      console.error("Error writing file:", error.message);
      process.exit(1);
    });

    gzipStream.on("error", (error) => {
      console.error("Error compressing file:", error.message);
      process.exit(1);
    });

    readStream.pipe(gzipStream).pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("Compression completed");
    });
  } catch (error) {
    console.error("Error during compression:", error.message);
    process.exit(1);
  }
};

await compress();
