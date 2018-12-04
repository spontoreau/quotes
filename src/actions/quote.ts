import { Context } from "koa";
import { getQuote, insertQuote } from "../models/quote";
import * as t from "io-ts";

const retrieveAllQuotes = async (context: Context) => {
    context = recreateContext(context)(200)(await getQuote());
}

const createQuote = async (context: Context) =>  {
    const quoteValidator = t.type({
        author: t.string,
        quote: t.string
    });

    const validationResult = quoteValidator.decode(context.request.body);

    context = validationResult.isLeft()
        ? recreateContext(context)(400)("Invalid query")
        : recreateContext(context)(200)(await insertQuote({
                                            author: validationResult.value.author,
                                            language: "Unknow",
                                            moderate: false,
                                            quote: validationResult.value.quote,
                                            sentimentScore: 0
                                        })
         );
}

const recreateContext = (context: Context) => (status: number) => (body: any) : Context => {
    context.status = status;
    context.body = body;
    return context;
}

export {
    retrieveAllQuotes,
    createQuote
}