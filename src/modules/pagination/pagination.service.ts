
import { client } from "../../lib/mongodb.js";

export async function getComments(page = 1, limit = 10) {
  const db = client.db("sample_mflix");
  const collection = db.collection("comments");

  const [comments, total] = await Promise.all([
    collection
      .find({})
      .sort({ _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray(),

    collection.countDocuments({}),
  ]);

  return {
    data: comments,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}


export const abc = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);

    const requestedLimit = parseInt(req.query.limit, 10) || 10;
    const limit = Math.min(100, Math.max(1, requestedLimit));

    const result = await getComments(page, limit);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};