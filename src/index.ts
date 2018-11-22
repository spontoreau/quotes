import { getRouter } from "./infrastructure/getRouter";
import { getApp } from "./infrastructure/getApp";

(() => {
    getApp(getRouter([])).listen(3000);
})();