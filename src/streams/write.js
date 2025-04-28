import { createWriteStream } from "fs";

const SOURCE_PATH = "./src/streams/files/fileToWrite.txt";

const write = async () => {
  try {
    const writeStream = createWriteStream(SOURCE_PATH);

    writeStream.on("error", (error) => {
      console.error("Error writing to file:", error.message);
      process.exit(1);
    });

    process.stdin.pipe(writeStream);

    writeStream.on("finish", () => {
      console.error("Write operation completed");
    });
  } catch (error) {
    console.error("Error writing to file:", error.message);
    process.exit(1);
  }
};

await write();
