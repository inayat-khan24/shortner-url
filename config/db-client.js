import { MongoClient } from "mongodb";

import { env } from "./env.js";

// this is a mongo db url 
export const dbClient = new MongoClient(env.MONGODB_URL);







