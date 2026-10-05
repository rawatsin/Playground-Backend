import { Router } from "express";
import { getComments } from "./pagination.service.js";

const router = Router();

router.get("/comments", async (_req, res) => {
  try {
    const comments = await getComments();

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
});

export default router;