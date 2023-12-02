import weaviate, { toBase64FromBlob } from "weaviate-ts-client";
import { readFileSync, readdirSync } from "fs";
import path from "path";

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080", // Replace with your endpoint
});

const schemaConfig = {
  class: "Meme",
  vectorizer: "img2vec-neural",
  vectorIndexType: "hnsw",
  moduleConfig: {
    "img2vec-neural": {
      imageFields: ["image"],
    },
  },
  properties: [
    {
      dataType: ["blob"],
      name: "image",
    },
    {
      dataType: ["string"],
      name: "text",
    },
  ],
};

// await client.schema.classCreator().withClass(schemaConfig).do();

const schemaRes = await client.schema.getter().do();
console.log(schemaRes);

const toBase64 = (img) => {
  return Buffer.from(img).toString("base64");
};

const img = readFileSync("./img/current.png");
const b64 = toBase64(img);

// await client.data
//   .creator()
//   .withClassName("Meme")
//   .withProperties({
//     image: b64,
//     text: "current scenario",
//   })
//   .do();

const imgFile = "curr.png";

await client.data
  .creator()
  .withClassName("Meme")
  .withProperties({
    image: b64,
    text: imgFile.split(".")[0].split("_").join(" "),
  })
  .do();

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
