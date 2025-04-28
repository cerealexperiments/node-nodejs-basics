import { cp, access, mkdir } from "fs/promises";

const SOURCE_PATH = "./src/fs/files/";
const TARGET_PATH = "./src/fs/files_copy/";

const copy = async () => {
  try {
    await access(SOURCE_PATH);

    try {
      await access(TARGET_PATH);
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
      await cp(SOURCE_PATH, TARGET_PATH, {
        recursive: true,
      });
    }
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await copy();
