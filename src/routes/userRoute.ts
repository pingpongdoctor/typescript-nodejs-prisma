import { Router } from "express";
import { getAllUser } from "../controllers/userController";
const router = Router();

router.route("/").get(getAllUser);

export default router;
