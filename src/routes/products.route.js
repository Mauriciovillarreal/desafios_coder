const fs = require(`node:fs`)
const express = require('express')
const { ProductManager } = require("../productsManager")

const path = '../Products.json'
const router = express.Router()
const productManager = new ProductManager("./Products.json")

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await productManager.getProducts()
        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit))
            return res.send(limitedProducts)
        }
        res.send(products)
    } catch (error) {
        console.error("Error occurred while getting products:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const productos = await productManager.getProducts()
        const product = productos.find(p => p.id === parseInt(pid))
        res.send(product)
    } catch (error) {
        console.error("Error occurred while getting products:", error)
        res.status(500).res({ error: "Internal server error" })
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: "Missing required fields" })
        }
        const products = await productManager.getProducts()
        const id = Date.now()
        const newProduct = {
            id,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails,
        }
        products.push(newProduct)
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'), 'utf-8')
        res.status(201).send(newProduct)
    } catch (error) {
        res.status(200).send({ status: 'success', payload: newProduct })
    }
})

router.put('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params
        const { title, description, code, price, stock, category, thumbnails } = req.body
        if (!title && !description && !code && !price && !stock && !category) {
            return res.status(400).json({ error: "No fields provided to update" })
        }
        const products = await productManager.getProducts()
        const productIndex = products.findIndex(p => p.id === parseInt(pid))
        if (productIndex === -1) {
            return res.status(404).json({ error: "Product not found" })
        }
        const updatedProduct = {
            ...products[productIndex],
            title: title || products[productIndex].title,
            description: description || products[productIndex].description,
            code: code || products[productIndex].code,
            price: price || products[productIndex].price,
            stock: stock || products[productIndex].stock,
            category: category || products[productIndex].category,
        }
        products[productIndex] = updatedProduct
        await fs.promises.writeFile(path, JSON.stringify(products))
        res.send(updatedProduct)
    } catch (error) {
        res.send({ status: 'success', payload: updatedProduct })
    }
})

router.delete('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params
        const products = await productManager.getProducts()
        const productIndex = products.findIndex(p => p.id === parseInt(pid))
        if (productIndex === -1) {
            return res.status(404).json({ error: "Product not found" })
        }
        products.splice(productIndex, 1)
        await fs.promises.writeFile(path, JSON.stringify(products))
        res.status(204).send()
    } catch (error) {
        res.send({ status: 'success', payload: productIndex })
    }
})

module.exports = router