import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";

const getApp = (router: Router) => {
    return new Koa()
            .use(bodyParser())
            .use(router.routes())
            .use(router.allowedMethods());
}

export {
    getApp
}