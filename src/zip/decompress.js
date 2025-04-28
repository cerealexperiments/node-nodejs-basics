import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";

const SOURCE_PATH = "./src/zip/files/archive.gz";
const TARGET_PATH = "./src/zip/files/fileToCompress.txt";

const decompress = async () => {
  try {
    const readStream = createReadStream(SOURCE_PATH);
    const writeStream = createWriteStream(TARGET_PATH);
    const gunzipStream = createGunzip();

    readStream.on("error", (error) => {
      console.error("Error reading archive:", error.message);
      process.exit(1);
    });

    writeStream.on("error", (error) => {
      console.error("Error writing file:", error.message);
      process.exit(1);
    });

    gunzipStream.on("error", (error) => {
      console.error("Error decompressing file:", error.message);
      process.exit(1);
    });

    readStream.pipe(gunzipStream).pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("Decompression completed");
    });
  } catch (error) {
    console.error("Error during decompression:", error.message);
    process.exit(1);
  }
};

await decompress();
