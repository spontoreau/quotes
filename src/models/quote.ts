import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";

type Quote = Readonly<{
    author: string,
    quote: string,
    language: string,
    moderate: boolean,
}>

const getCosmosClient = () : CosmosClient => {
    return new CosmosClient({ endpoint: "", auth: { masterKey: "" }});
}

const getCollection = (client: CosmosClient) => (database: string) => (collection: string) => {
    return client.database(database).container(collection);
}

const getQuote = async () : Promise<ReadonlyArray<Quote>> => {
    const querySpec: SqlQuerySpec = {
        query: "SELECT * FROM root WHERE r.moderate=@moderate",
        parameters: [{
            name: "@moderate",
            value: false
        }]
    };
    const client = getCosmosClient();
    const collection = getCollection(client)("QuoteDB")("Quote");
    const { result } = await collection.items.query(querySpec).toArray();
    return result ? result : [];
}

const insertQuote = async (quote: Quote) => {
    const client = getCosmosClient();
    const collection = getCollection(client)("QuoteDB")("Quote");
    const { body } = await collection.items.create(quote);
    return body;
}

export {
    Quote,
    getQuote,
    insertQuote
}