const fs = require(`node:fs`)
const express = require('express')

const router = express.Router()
const productJson = fs.readFileSync('./Products.json')
const products = JSON.parse(productJson)

router.get('/', (req, res) => {
    res.render('home', {
        products,
        styles: 'homeStyles.css'
    })
})

router.get('/realtimeprodcuts', (req, res) => {
    res.render('realTimeProducts', {
        products,
        styles: 'homeStyles.css'
    })
})

module.exports = router