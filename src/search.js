import path from "path";
import { readFileSync, readdirSync, writeFileSync } from "fs";
import client from "./client.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const outDir = path.join(__dirname, "..", "out");
const testDir = path.join(__dirname, "..", "test");
const testFile = readdirSync(testDir)[0];

const testImg = readFileSync(path.join(testDir, testFile));
const test = Buffer.from(testImg).toString("base64");
let limit = 1;

const resImage = await client.graphql
  .get()
  .withClassName("Meme")
  .withFields(["image"])
  .withNearImage({ image: test })
  .withLimit(limit)
  .do();

const result = resImage.data.Get.Meme[0].image;
writeFileSync(path.join(outDir, `result-${0}.png`), result, "base64");
