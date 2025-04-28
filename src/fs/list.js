import { access, readdir } from "fs/promises";

const SOURCE_PATH = "./src/fs/files";

const list = async () => {
  try {
    await access(SOURCE_PATH);
    const files = await readdir(SOURCE_PATH);
    files.forEach((file) => console.log(file));
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await list();
