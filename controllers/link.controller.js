import { nanoid } from "nanoid"
import { Link } from "../models/Links.js"

export const getLinks = async(req, res) =>{
    try {

        const links = await Link.find({uid: req.uid})
        res.json({links})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error de server"})
    }
}

export const getLink = async(req, res) =>{
    try {
        const {nanoLink} = req.params
        const link = await Link.findOne({nanoLink})

        if(!link) return res.status(404).json({error: "no existe el link"})
        
        return res.json({longLink: link.longLink})
        
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato ID incorrecto"})
        }
        return res.status(500).json({error: "Error de server"})
    }
}
//para crud tradicional
export const getLinkCRUD = async(req, res) =>{
    try {
        const {id} = req.params
        const link = await Link.findById(id)

        if(!link) return res.status(404).json({error: "no existe el link"})
        if (!link.uid.equals(req.uid)) return res.status(401).json({error: "No le pertenece el id"})
        return res.json({link})
        
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato ID incorrecto"})
        }
        return res.status(500).json({error: "Error de server"})
    }
}

export const createLink = async (req, res) => {
    try {
        let {longLink} = req.body
        if(!longLink.startsWith("https://")){
                    longLink  = "https://" + longLink
                }
        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid})
        const newLink = await link.save()
        return res.status(201).json({newLink}) 
    } catch (error) {
        return res.status(500).json({error: "Error de servidor"})
    }
 }

 export const removeLink = async(req, res) =>{
    try {
        const {id} = req.params
        const link = await Link.findById(id)

        if(!link) return res.status(404).json({error: "no existe el link"})
        if (!link.uid.equals(req.uid)) return res.status(401).json({error: "No le pertenece el id"})
        await link.deleteOne()
        return res.json({link})
        
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato ID incorrecto"})
        }
        return res.status(500).json({error: "Error de server"})
    }
}

export const updateLink = async (req, res) => {
    try {
        const {id} = req.params
        const {longLink} = req.body
        console.log(longLink);
        if(!longLink.startsWith("https://")){
            longLink  = "https://" + longLink
        }
        const link = await Link.findById(id)
        if(!link) return res.status(404).json({error: "no existe el link"})
        if (!link.uid.equals(req.uid)) return res.status(401).json({error: "No le pertenece el id"})
        
        // actualizar
        link.longLink = longLink
        await link.save()
        return res.json({link})
        
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato ID incorrecto"})
        }
        return res.status(500).json({error: "Error de server"})
    }
 } 