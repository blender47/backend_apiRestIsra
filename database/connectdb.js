import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log("DB Connected 👍");
} catch (error) {
    console.log("Error de conexion a Mongo:" + error);
}