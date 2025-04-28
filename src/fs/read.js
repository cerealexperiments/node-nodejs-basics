import { access, readFile } from "fs/promises";

const SOURCE_PATH = "./src/fs/files/fileToRead.txt";

const read = async () => {
  try {
    await access(SOURCE_PATH);
    const content = await readFile(SOURCE_PATH, "utf8");
    console.log(content);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await read();
