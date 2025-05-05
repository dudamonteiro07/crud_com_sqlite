import express from "express"
import userRoutes from "./routes/userRoute.js"

const app = express()

// permite que o epress entenda
// JSON no corpo da requisição
app.use(express.json())

/**define o endpoint /users para as
 * rotas de usuário
 */
app.use("/users",userRoutes)


export default app;