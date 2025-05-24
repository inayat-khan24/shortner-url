import crypto from "crypto"
import { loadLinks,saveLinks } from "../models/shotner.model.js"



export const getShortnerPage = async(req,res)=>{
try {
 
  const links = await loadLinks()
 return res.render("index",{links,host:req.host})

} catch (error) {
     console.error(error)
    return res.status(500).send("Internal Server error")
}

}


export const  postURLShortner = async(req,res)=>{
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
} }

export const redirectToShortLink = async(req,res)=>{
try {
    const {shortCode} = req.params
    const links = await loadLinks()
    if(!links[shortCode]) return res.status(404).send("404 error occured")
    return res.redirect(links[shortCode])
  
} catch (error) {
    console.error(error)
    return res.status(500).send("Internal Server error")
}
}