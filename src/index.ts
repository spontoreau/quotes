import { getRouter } from "./infrastructure/getRouter";
import { getApp } from "./infrastructure/getApp";
import { routes } from "./routes";

(() => {
    getApp(getRouter(routes)).listen(3000);
})();