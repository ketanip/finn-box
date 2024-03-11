import { Router } from "express";
import controllers from "./controllers";

const router = Router();

router.post("/sign-up" ,controllers.SignUp);
router.post("/sign-in", controllers.SignIn);
router.post("/forget-password");
router.post("/reset-password");

export default router;