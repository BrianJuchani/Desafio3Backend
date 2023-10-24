import { ProductManager } from './productManager.js';
import express from 'express';
const productManager =new ProductManager("./products.Json")

const app = express();

app.use(express.json())

app.get('/products' ,async (req,res)=>{ 
    try {
        const {limit}= req.query
        const products =await productManager.getProducts();
        if(!limit)res.status(200).json(products)
        else{
            const produtbyLimit= await productManager.getProductsByLimit(limit)
            res.status(200).json(produtbyLimit)
        }
    } catch (error) {
        res.status(500).json(error.message)
        
    }
    
})
app.post('/products',async(req,res)=>{
    try {
        const productos = {...req.body};
        console.log(productos)
        const  AddProduct= await productManager.addProduct(productos);
        res.status(200).json(AddProduct)
        
    } catch (error) {
        console.log(error.message)
        
    }

      
})  
app.get('/products/:id',async(req,res)=>{
    try {
        const {id}= req.params
        const prod=await productManager.getProductById(Number(id))
        if(!prod)res.status(404).json({message:'id no encontrado'})
        else res.status(200).json(prod)
    } catch (error) {
        res.status(500).json (error.message)   
    }
})

const PORT = 8080;

app.listen(PORT,()=>console.log(`server ok port ${PORT} `))


