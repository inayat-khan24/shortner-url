import express from "express"

import { readFile, writeFile } from "fs/promises"
import path from "path"




const app = express()
const PORT = 3003
// path of JSON sile
const DATA_file = path.join("data","links.json")

// app.use(express.static("public"))

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_file, "utf-8");
         return JSON.parse(data)
        } catch (err) {
    console.error("Error reading file:", err);
  }
};






app.get("/",async(req,res)=>{
try {
  const file = await readFile(path.join("views","index.html"))
  const links = await loadLinks()
  const content = file.toString().replaceAll("{{shorten_urls}}",
 Object.entries(links).map(
        ([shortCode,url])=>
            `<li> <a href="/${shortCode}" target="_blank" class="text-blue-700"> ${req.host}/${shortCode}</a> - ${url} </li>`
    ).join("")

  )
return res.send(content)

} catch (error) {
     console.error(error)
    return res.status(500).send("Internal Server error")
}

})



app.listen(PORT,()=>{

    console.log(`server is running at http://localhost:${PORT}`)
})

