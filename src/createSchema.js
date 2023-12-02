import schemaConfig from "../model/image.js";
import client from "./client.js";

await client.schema.classCreator().withClass(schemaConfig).do();
