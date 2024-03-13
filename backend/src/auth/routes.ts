import { Router } from "express";
import controllers from "./controllers";
import middlewares from "@/middlewares";

const router = Router();

router.post("/sign-up" ,controllers.SignUp);
router.post("/sign-in", controllers.SignIn);
router.put("/update-profile", middlewares.authenticate, controllers.updateProfile);

export default router;