import express from "express"
import  { shortnerRoutes } from "./routes/shortner.routes.js"

const app = express()

const PORT = 3003


// app.use(express.static("public"))
app.use(express.urlencoded({"extended":true}))

app.set("view engine","ejs")
// express router
app.use(shortnerRoutes)


app.listen(PORT,()=>{

    console.log(`server is running at http://localhost:${PORT}`)
})

