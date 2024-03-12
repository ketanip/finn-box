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

router.get("/:id", controllers.getTransaction);
router.post("/", controllers.createTransaction);
router.put("/:id", controllers.updateTransaction);
router.delete("/:id", controllers.deleteTransaction);

// Exporting data.
export default router;