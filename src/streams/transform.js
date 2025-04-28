import { Transform } from "stream";

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const input = chunk.toString();
      const reversed = input.split("").reverse().join("");
      this.push(reversed + "\n");
      callback();
    },
  });

  try {
    process.stdin.pipe(reverseTransform).pipe(process.stdout);
  } catch (error) {
    console.error("Error in transform stream:", error.message);
    process.exit(1);
  }
};

await transform();
