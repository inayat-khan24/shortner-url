
import { Router } from "express"
import { 
     postURLShortner 
    ,getShortnerPage, 
    redirectToShortLink} from "../controllers/postshortner.controller.js"

    const router  = Router();
    
    router.get("/",getShortnerPage)

    router.post("/",postURLShortner)

    router.get("/:shortCode",redirectToShortLink)

// Name export 
export const shortnerRoutes = router








