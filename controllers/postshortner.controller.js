import crypto from "crypto"

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
} 

}