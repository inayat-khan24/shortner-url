import express, { urlencoded } from "express"

import { readFile, writeFile } from "fs/promises"

import path from "path"




const app = express()
const PORT = 3003
// path of JSON sile
const DATA_file = path.join("data","links.json")

// app.use(express.static("public"))
app.use(urlencoded({"extended":true}))

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_file, "utf-8");
         return JSON.parse(data)
        } catch (error) {
      if(error.code === "ENOENT"){
            await writeFile(DATA_FILE,`${JSON.stringify({})}`)
            return {}
             }

             throw error
  }
};

const saveLinks = async(links)=>{
await writeFile(DATA_file,JSON.stringify(links))
}






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

// post method

app.post("/", async(req,res)=>{
try {
   const {url,shortCode} = req.body 
   const finalShortcode = shortCode || crypto.randomBytes(4).toString("hex")
   const links = await loadLinks();  
    if(links[finalShortcode]){
        return res.status(400).send("Short code already exists. please choose another.");
    }
   
    links[finalShortcode] = url
  await saveLinks(links) 
  return res.redirect("/")    

    
} catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
} 

})

// app.post("/",async (req,res)=>{
// try {
//    const {url,shortCode} = req.body 
//    const finalShortcode = shortCode || crypto.randomBytes(4).toString("hex")
//    const links = await loadLinks();  
//     if(links[finalShortcode]){
//         return res.status(400).send("Short code already exists. please choose another.");
//     }
   
//     links[finalShortcode] = url
//   await saveLinks(links) 
//   return res.redirect("/")       
   
// } catch (error) {
//     console.error(error)
//     return res.status(500).send("Internal server error")
// }
// })





app.get("/:shortCode",async(req,res)=>{
try {
    const {shortCode} = req.params
    const links = await loadLinks()
    if(!links[shortCode]) return res.status(404).send("404 error occured")
    return res.redirect(links[shortCode])
  
} catch (error) {
    console.error(error)
    return res.status(500).send("Internal Server error")
}
})




app.listen(PORT,()=>{

    console.log(`server is running at http://localhost:${PORT}`)
})

