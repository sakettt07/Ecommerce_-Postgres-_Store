import { sql } from "../config/db.js";

const getProducts=async(req,res)=>{
    try {
        const products=await sql`
        SELECT * FROM products ORDER BY created_at DESC`;

        console.log("fetched products",products);
        res.status(200).json({success:true,data:products});
    } catch (error) {
        console.log(error);
    }
}
const getProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await sql`
        SELECT * FROM products WHERE id = ${id}`;
        if(product.length===0){
            return res.status(404).json({
                success:false,
                message:"Product doesn't exist"
            })
        }
        console.log(`Product with id: ${id} fetched successfully`);
        res.status(200).json({success:true,data:product[0]});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
const createProduct=async(req,res)=>{
    const {name,price,image}=req.body;
    if(!name||!price||!image){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    try {
        const newProduct=await sql`
        INSERT INTO products(name,price,image) VALUES(${name},${price},${image}) RETURNING *
        `;

        res.status(201).json({
            success:true,
            data:newProduct[0]
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
const updateProduct=async(req,res)=>{
    const {id}=req.params;
    const {name,price,image}=req.body;
    try {
        const updatedProduct=await sql`
    UPDATE products SET name=${name},price=${price},image=${image} WHERE id=${id} RETURNING *
    `;
    if(updatedProduct.length===0){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(200).json({
        success:true,
        data:updatedProduct[0]
    });
    } catch (error) {
       console.log(error);
       res.status(500).json({
        success:false,
        message:"Internal Server Error"
       }) 
    }
}
const deleteProduct=async(req,res)=>{
    const {id}=req.params;
    try {
        
    const deleteProduct=await sql`
    DELETE from products where id=${id}
    RETURNING *`;
    if(deleteProduct.length===0){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export {getProducts,getProduct,createProduct,updateProduct,deleteProduct};