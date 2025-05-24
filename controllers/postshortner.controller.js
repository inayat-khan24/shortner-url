import crypto from "crypto"
import { loadLinks,saveLinks,getLinkByshortCode} from "../models/shotner.model.js"



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
   // now we pass url and shortnode who come form user
  await saveLinks({url,shortCode})
  return res.redirect("/")    

    
} catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
} }

export const redirectToShortLink = async(req,res)=>{
try {
    const {shortCode} = req.params
   
    // we get data with getLinkByshortCode
    const link = await getLinkByshortCode(shortCode)
   
    if(!link) return res.redirect("/404")
        return res.redirect(link.url)
        
  
} catch (error) {
    console.error(error)
    return res.status(500).send("Internal Server error")
}
}