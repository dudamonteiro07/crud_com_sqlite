
// Requisição => Middleware =>
// Rota(Controllers) => Resposta

// function Middleware(resq, res, next){

// //     // 1. fazer algo com a requisição
// //     // -> Validar as informações 
// //     // -> verificar se o user tem conta
// //     // 2. Modificar a resposta
// //     // -> dar uma resposta ao cliente
// //     // 3. chamar o next() para passar para 
// //     // proximo middleware(agente)
// //     // ou encerrar com res.send()v
// // 
// }



export function validate(schema){

    return (req, res, next) => {
        try {
            // *Validar o corpo da requisição 
            // contra schema fornecido/*
            const validatedData = schema.parse(req.body)

            /**substituir o body pelos dados validados */
            req.body = validatedData

            /**chamo o proximo agente(middleware) */
            next()

        } catch (error) {
            return res.status(400).json({
                menssage: "Errro de validação",
                erro: error.menssage
            })
        }
    }
}