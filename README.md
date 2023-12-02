# Image-Search-Engine

Finding similar images using Vector Database

## Install dependencies

```bash
npm install
```

## Run `DockerCompose` file

```bash
docker-compose up -d
```

## Create schema for vector databases

```bash
node createSchema.js
```

## Add Images

Add Images to `images` folder with proper `filename` that consist details about image and run the program to index them.

```bash
node addImages.js
```

## Run the program to search for images

Add test image to the `/test` folder, then run the following command

```bash
node search.js
```
