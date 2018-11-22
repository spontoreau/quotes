import { Context } from "koa";

const retrieveAllQuotes = async (context: Context) => {
    context.body = "TODO get all";
    await Promise.resolve();
}

const createQuote = async (context: Context) =>  {
    context.body = "TODO post";
    await Promise.resolve();
}

export {
    retrieveAllQuotes,
    createQuote
}