import { Router } from "express";
import test from "../../services/test/test";

const router = Router();

router.get("/test", test);

export default router;
