import { Router } from "express";
import { abc, getComments } from "./pagination.service.js";

const router = Router();

router.get("/comments", abc);

export default router;