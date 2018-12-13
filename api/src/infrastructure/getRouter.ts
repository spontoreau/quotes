import Router from "koa-router";
import { HttpMethod } from "./httpMethod";
import { Context } from "koa";

type Route = Readonly<{
    path: string;
    method: HttpMethod;
    action: (context: Context) => void;
}>;

const getRouter = (routes: ReadonlyArray<Route>) : Router => {
    return registerRoutes(new Router(), routes);
}

const registerRoutes = (router: Readonly<Router>, routes: ReadonlyArray<Route>) : Router => {
    return routes.length > 0
        ? registerRoutes(applyRoute(router, routes[0]), routes.slice(1))
        : router;
}

const applyRoute = (router: Readonly<Router>, route: Route) : Router => {
    return ((route: Route) => {
        switch(route.method) {
            case HttpMethod.Get :
                return router.get(route.path, route.action);
            case HttpMethod.Post :
                return router.post(route.path, route.action);
            default:
                return router;
        }
    })(route);
}

export {
    Route,
    getRouter
}