import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body
    try {
        const newProduct = await prisma.products.create({
            data: {
                name,
                description,
                price, 
                stock
            }
        })
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(201).json({
            mensagem: "Erro ao criar um novo produto ",
            erro: error.message
        })
    }
}


export const getAllProducts = async (req, res) => {
    const products = await prisma.products.findMany()
    try {
        res.status(200).json(products)
    } catch (error) {
        res.status(201).json({
            mensagem: "Erro ao buscar todos os products",
            erro: error.message
        })
    }
}

export const getProductsId = async (req, res) => {
    try {
      const id = req.params.id
      const products = await prisma.products.findUnique({
        where: { id: parseInt(id) },
      });
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({
        mensagem: "Error ao procurar produto, produto não encontrado!",
        erro: error.message,
      })
    }
  }

export const updateProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    const { name, description, price, stock } = req.body

    try {
       const updatedProduct = await prisma.products.update({
            where: { id: id },
            data: { name, description, price, stock }
        })
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(400).json({
            mensagem: "Erro ao atualizar produto! ",
            erro: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const product = await prisma.products.delete({
            where: { id: id }
        })
        res.status(200).json(product)

    } catch (error) {
        res.status(200).json({
            mensagem: "Produto não deletado",
            erro: error.message
        })
    }

}