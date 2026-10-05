import { client } from "../../lib/mongodb.js";

export async function getComments() {
  const db = client.db("sample_mflix");

  const comments = await db
    .collection("comments")
    .find({})
    .limit(200)
    .toArray();

  return comments;
}