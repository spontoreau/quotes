import { Context } from "koa";
import { getQuote, insertQuote } from "../models/quote";
import * as t from "io-ts";

const retrieveAllQuotes = async (context: Context) => {
    context.body = await getQuote();
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
                                            author: validationResult._A.author,
                                            language: "Unknow",
                                            moderate: false,
                                            quote: validationResult._A.quote
                                        })
         );
}

const recreateContext = (context: Context) => (status: number) => (body: any) : Context => {
    return {
        ...context,
        response : {
            ...context.response,
            status: status
        },
        body: body
    }
}

export {
    retrieveAllQuotes,
    createQuote
}