import "dotenv/config";
import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export async function connectToMongoDB() {
  if (client) {
    return client;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  client = new MongoClient(uri);
  await client.connect();
  console.log("MongoDB connected");
  return client;
}

export async function disconnectFromMongoDB() {
  if (client) {
    await client.close();
    client = null;
  }
}
export { client };