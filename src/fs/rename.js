import { rename, access } from "fs/promises";

const SOURCE_PATH = "./src/fs/files/wrontFilename.txt";
const TARGET_PATH = "./src/fs/files/properFilename.md";

const rename = async () => {
  try {
    await access(SOURCE_PATH);

    try {
      await access(TARGET_PATH);
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code === "ENOENT") {
        await rename(SOURCE_PATH, TARGET_PATH);
      } else {
        throw new Error("FS operation failed");
      }
    }
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await rename();
