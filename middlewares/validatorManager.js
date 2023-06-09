import { param, validationResult } from "express-validator"
import {body} from 'express-validator'
import axios from "axios";
//import { validationResultExpress } from "../middlewares/validationResultExpress.js";


export const validationResultExpress = (req, res, next) =>{
    const errors = validationResult (req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}

export const bodyRegisterValidator = [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "El password debe llevar longitud minima de 6 caracteres")
        .trim()
        .isLength({min: 6}),    
    body('password', "Formato de password incorrecto")
        .custom((value, {req})=>{
            if(value !== req.body.repassword){
                throw new Error('No coinciden los passwords')
            }
            return value
        }),
        validationResultExpress
    ]

    export const paramLinkValidator = [
        param("id", "Formato no valido (EV)")
        .trim()
        .notEmpty()
        .notEmpty()
        .escape(),
        validationResultExpress
    ]

    export const bodyLinkValidator = [
        body("longLink", "Formato de link incorrecto")
        .trim()
        .notEmpty()
        .custom(async (value) =>{
            try {
                if(!value.startsWith("https://")){
                    value  = "https://" + value
                }
                console.log(value);
                await axios.get(value)   
                return value 
            } catch (error) {
                // console.log(error);
                throw new Error('not found longLink 404')
            }
        }),
        validationResultExpress
    ]

    export const bodyLoginValidator = [
        body('email', 'Formato de email incorrecto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', "El password debe llevar longitud minima de 6 caracteres")
            .trim()
            .isLength({min: 6}),    
            validationResultExpress
    ]