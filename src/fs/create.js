import { writeFile, access } from "fs/promises";

const FILE_PATH = "./src/fs/files/fresh.txt";

const create = async () => {
  try {
    await access(FILE_PATH);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }

    try {
      await writeFile(FILE_PATH, "I am fresh and young");
    } catch (err) {
      throw new Error("Unknown error");
    }
  }
};

await create();
