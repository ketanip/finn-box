import middlewares from "@/middlewares";
import { Router } from "express";
import controllers from "./controllers";

// Router.
const router = Router();

// Middlewares.
router.use(middlewares.authenticate);

// Routes.
router.get("/", controllers.AllTransaction);
router.get("/dashboard-data", controllers.DashboardData);

router.get("/:id");
router.post("/:id");
router.put("/:id");
router.delete("/:id");

// Exporting data.
export default router;