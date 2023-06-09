import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) =>{
    const {email, password} = req.body
    try {
        //alternativa buscando por email
        let user = await User.findOne({email})
        if (user) throw {code: 11000} 
        user = new User({email, password})
        await user.save()
        //jwt token
        const {token, expiresIn} = generateToken(user.id)
        generateRefreshToken(user.id, res)
        return res.status(201).json({token, expiresIn})
    } catch (error) {
        //alternativa por defecto mongoose
        console.log(error);
        if(error.code = 11000){
            return res.status(400).json({error: "El Email ya existe"})
        }
        return res.status(500).json({error: "Algo salio mal del lado del servidor"})
    }
}

export const login = async (req, res) =>{
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user) return res.status(403).json({error: "No existe el usuario"})
        
        const respuestaPass = await user.comparePassword(password)
        if(!respuestaPass) return res.status(403).json({error: "La contraseña que se introdujo es incoorectamente"})

        //generar JWT
        const {token, expiresIn} = generateToken(user.id)
        generateRefreshToken(user.id, res)
        return res.json({token, expiresIn})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Algo salio mal del lado del servidor"})
    }

}

export const infoUser = async(req, res) =>{
    try {
        const user = await User.findById(req.uid).lean()
        return res.json({email: user.email, uid: user._id})
    } catch (error) {
        return res.status(500).json({error: "error de server"})
    }
}

export const refreshToken = (req, res) =>{
    try {
           
        const {token, expiresIn} = generateToken(req.uid)

        return res.json({token, expiresIn})
    } catch (error) {
        console.log(error);     
        return res.status(500).json({error: "error de server"})
    }
}

export const logout = (req, res) =>{
    res.clearCookie('refreshToken')
    res.json({ok: true})
}