import { Route } from "./infrastructure/getRouter";
import { retrieveAllQuotes, createQuote } from "./actions/quote";
import { HttpMethod } from "./infrastructure/httpMethod";

const routes: ReadonlyArray<Route> = [
    {
        action: retrieveAllQuotes,
        method: HttpMethod.Get,
        path: "/quote"
    }, {
        action: createQuote,
        method: HttpMethod.Post,
        path: "/quote"
    }
];

export {
    routes,
}