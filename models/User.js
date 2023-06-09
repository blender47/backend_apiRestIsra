import mongoose from "mongoose";
import b from 'bcryptjs'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next){
    const user = this
if(!user.isModified('password')) return next()     
    try {
        const salt = await b.genSalt(10)
        user.password = await b.hash(user.password, salt)
        next()
        
    } catch (error) {
        console.log(error);
        throw new Error('Ocurrio un error al querer hashear la contraseña')
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await b.compare(candidatePassword, this.password)
}

export const User = mongoose.model('User', userSchema) 