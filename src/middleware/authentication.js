
import { verifyToken } from "../utils/auth.js";

export function authenticate(req, res, next) {

    // obter o token do header Authorization
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            mensagem: "Token de acesso não fornecido!"
        })
    }

    try {
        // verificar se o token é válido]
        // adicionar os dados decodificados do Token
        // na  requisoção

        const decoded = verifyToken(token)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            mensagem: "Token inválido ou expirado!"
        })
    }

}