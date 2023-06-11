import 'dotenv/config'
import './database/connectdb.js'
import express from 'express'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import linkRouter from './routes/link.route.js' 
import redirectRouter from './routes/redirect.route.js'
import cors from 'cors'

const app = express()
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]
app.use(
    cors({
        origin: function(origin, callback){
            console.log(":S:s:s =>", origin);
            if(!origin || whiteList.includes(origin)){
                return callback(null, origin)
            }
            return callback(
                "Error de cors origin: " + origin + " No autorizado"
                )
        },
        credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Ejemplo
app.use('/', redirectRouter)

app.use('/api/v1/auth/', authRouter)
app.use('/api/v1/links/', linkRouter)

//app.use(express.static("public"))

const PORT = process.env.PORT || 5003

app.listen(PORT, () => console.log("🌽🌽🌽 http://localhost:" + PORT))