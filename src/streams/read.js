import { createReadStream } from "fs";

const SOURCE_PATH = "./src/streams/files/fileToRead.txt";

const read = async () => {
  try {
    const readStream = createReadStream(SOURCE_PATH);

    readStream.on("error", (error) => {
      console.error("Error reading file:", error.message);
      process.exit(1);
    });

    readStream.pipe(process.stdout);
  } catch (error) {
    console.error("Error reading file:", error.message);
    process.exit(1);
  }
};

await read();
