import {z} from "zod"
import dotenv from "dotenv"
dotenv.config()

export const env = z.object({
    PORT: z.coerce.number().default(3003),
    MONGODB_URL : z.string() ,
    MONGODB_DATABASE_NAME : z.string()

}).parse(process.env)