import { getRouter } from "./infrastructure/getRouter";
import { getApp } from "./infrastructure/getApp";
import { routes } from "./routes";
import { config } from "dotenv";

(() => {
    config();
    getApp(getRouter(routes)).listen(3000);
})();