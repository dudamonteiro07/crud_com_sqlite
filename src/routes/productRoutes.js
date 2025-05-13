import express from "express"
import { validate } from "../middleware/validate.js"
import { createProduct, deleteProduct, getAllProducts, getProductsId, updateProduct } from "../controllers/productController.js"
import { createproductsSchemas, updateproductsSchemas } from "../schemas/productSchemas.js"
const router = express.Router()


router.post("/", validate(createproductsSchemas), createProduct)

router.get("/", getAllProducts)

router.get("/:id", getProductsId)

router.put("/:id", validate(updateproductsSchemas), updateProduct)

router.delete("/:id", deleteProduct)



export default router