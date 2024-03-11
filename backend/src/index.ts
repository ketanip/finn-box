import Express, { json } from "express";
import CONFIG from "./config";
import auth from "./auth";
import morgan from "morgan";
import types from "@/types";
import transaction from "./transaction";

const main = async () => {

    // Express app.
    const app = Express();
    
    // Middlewares.
    app.use(json());
    app.use(morgan('tiny'));

    // Routes.
    app.use("/auth", auth.routes);
    app.use("/transactions", transaction.routes);

    // Main server.
    app.listen(CONFIG.SERVER.PORT, () => {
        console.log(`Server active on http://localhost:${CONFIG.SERVER.PORT}`);
    });

};

main();