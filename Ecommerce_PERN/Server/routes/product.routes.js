import express from "express";
import { getProducts,getProduct,createProduct,updateProduct,deleteProduct} from "../controllers/product.controller.js";

const router=express.Router();

router.get("/all",getProducts);
router.get("/:id",getProduct);
router.post("/create",createProduct);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);
export default router;