import { PrismaClient } from '@prisma/client';
import { json } from 'express';
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
            data: { name, email, password}
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