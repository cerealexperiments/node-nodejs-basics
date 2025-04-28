import { access, unlink } from "fs/promises";

const SOURCE_PATH = "./src/fs/files/fileToRemove.txt";

const remove = async () => {
  try {
    await access(SOURCE_PATH);
    await unlink(SOURCE_PATH);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await remove();
