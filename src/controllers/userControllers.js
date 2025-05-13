import { PrismaClient } from '@prisma/client';
import { json } from 'express';
import { comparePassword, generateToken, hashPassword } from '../utils/auth.js';
const prisma = new PrismaClient()


// export const getAllUsers = (req, res)=>{

//     res.status(200).json({
//         mensagem: "rota GET users funcionando! "
//     })
// } 


export const getAllUsers = async (req, res) => {

    try {

        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar todos os usuários",
            erro: error.message
        })
    }
}





export const creatUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        // tento fazer algo aqui

        const newUser = await prisma.user.create({
            data: { name, email, password }
        })
        res.status(201).json(newUser)
    } catch (error) {

        res.status(201).json({
            menssage: "Error ao criar o novo usuário",
            erro: error.message
        })

    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id
    const { name, email } = req.body

    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, email }
        })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({
            mensagem: "Erro ao atualizar usuário",
            erro: error.message
        })
    }

}


export const postUsers = (req, res) => {
    const { nome, email } = req.body
    const users = {
        nome,
        email
    }
    res.status(201).json(users)
}


export const deleteUser = async (req, res) => {
    const id = req.params.id
    const deletedUser = await prisma.user.delete({
        where: { id: Number(id) }
    })
    res.status(200).json(deletedUser)
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        // criar a senha do usuário hasheada
        const hashedPassword = await hashPassword(password)

        // cria um usúario no banco de dados
        const newRegisteredUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })
        // gerar um token jwt
        const token = generateToken(newRegisteredUser)

        res.status(201).json({

            name: newRegisteredUser.name,
            email: newRegisteredUser.email,
            token: token
        })
    } catch (error) {
        res.status(400).json({
            erro: "Erro ao criar o usuário",
            detalhes: error.message
        })

    }
}


export const getUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            mensagem: "Error ao procurar o usuario, usuario não encontrado!",
            erro: error.message,
        });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // 01. buscar o usuário pelo email

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
         if (!user) {
            return res.status(401).json({
                mensagem: "Credenciais inválidas!"
            })
        }

        // 02.comprar a senha fornecida
        const passwordMatch = await comparePassword(
            password, user.password
        )
        if (!passwordMatch) {
            return res.status(401).json({
                mensagem: "Credenciais invalidas"
            })
        }
        const token = generateToken(user)

        res.json({
            usuario: { name: user.name, email: user.email },
            token
        })

        // 03. gerar token jwt

        // 04./ envia como resposta o usuário e o token

    }
    catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao fazer login!',
            erro: error.message
        })
    }
}
