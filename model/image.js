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

export default schemaConfig;
