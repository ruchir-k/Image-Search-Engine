import path from "path";
import { readFileSync, readdirSync } from "fs";
import client from "./client.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const imageDir = path.join(__dirname, "..", "img");
const imageFiles = readdirSync(imageDir);

for (const file of imageFiles) {
  const currImg = readFileSync(path.join(imageDir, file));
  const b64 = Buffer.from(currImg).toString("base64");
  const currImgName = path.parse(file).name;

  await client.data
    .creator()
    .withClassName("Meme")
    .withProperties({
      image: b64,
      text: currImgName,
    })
    .do();
}
