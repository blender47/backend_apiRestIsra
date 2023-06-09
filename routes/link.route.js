import { Router } from "express";
import { createLink, getLink, getLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { validaToken } from "../middlewares/validateToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";

const router = Router()

//GET           /api/v1/links        ALL LINKS
//GET           /api/v1/links/:id    SINGLE LINK  
//POST          /api/v1/links        CREATE LINK   
//PATCH/PUT     /api/v1/links/:id    UPDATE LINK   
//DELETE        /api/v1/links/:id    REMOVE LINK   

router.get('/', validaToken, getLinks)
router.get('/:nanoLink', getLink)
router.post('/', validaToken, bodyLinkValidator , createLink)
router.delete('/:id', validaToken, paramLinkValidator, removeLink)
router.patch('/:id', validaToken, paramLinkValidator, bodyLinkValidator, updateLink)
export default router