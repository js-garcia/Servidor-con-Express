import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()
const PORT = 8080
const manager = new ProductManager('./src/products.json')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Desafio #3 - Servidor con Express")
})

//Consulta de productos

app.get('/products', async (req, res) => {
    const products = await manager.getProducts()
    let {limit} =req.query
    let datos
    if(limit) {
        data = products.slice(0, parseInt(limit))
        res.send(`Estos son los productos segun limite: ${(JSON.stringify(data))}`)
     } else {
        data = products
        res.send(`Estos son todos los productos existentes: ${(JSON.stringify(data))}`)
     }
})

//Consulta de productos segun id

app.get('/products/:id', async (req, res) => {
    try{
        const product = await manager.getProductById(parseInt(req.params.id))
        res.send(`El producto con ID ${product.id} es el siguiente: ${(JSON.stringify(product))}`)
    }
    catch {
        res.send('Producto inexistente')
    }
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})