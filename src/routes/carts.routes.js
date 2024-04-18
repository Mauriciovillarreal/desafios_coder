const fs = require(`node:fs`)
const express = require('express')
const { CartManager } = require('../cartsManager')

const path = '../Carts.json'
const router = express.Router()
const cartManager = new CartManager('./Carts.json')


router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const productsCart = await cartManager.getCarts()
        const cart = productsCart.find(cart => cart.id === parseInt(cid))
        res.send(JSON.stringify(cart))   
    } catch (error) {
        console.error("An error occurred while getting the cart:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.post('/', async (req, res) => {
    try {
        const productsCart = await cartManager.getCarts()
        const id = Date.now()
        const newCart = {
            id,
            products: []
        }
        productsCart.push(newCart)
        await fs.promises.writeFile(path, JSON.stringify(productsCart, null, '\t'), 'utf-8')
        res.send(newCart)
    } catch (error) {
        console.error("An error occurred while submitting the cart:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
      const { cid, pid } = req.params
      const productsCart = await cartManager.getCarts()
      const cart = productsCart.find((cart) => cart.id === parseInt(cid))
      if (!cart) {
        return res.status(404).send('Cart not found')
      }
      const product = cart.products.find((product) => product.id === parseInt(pid))
      if (product) {
        product.quantity++
      } else {
        cart.products.push({ id: parseInt(pid), quantity: 1 })
      }
      await fs.promises.writeFile(path, JSON.stringify(productsCart, null, '\t'), 'utf-8')
      res.send(cart)
    } catch (error) {
      console.error('An error occurred while adding the product to the cart:', error)
      res.status(500).send('Internal Server Error')
    }
  })

module.exports = router