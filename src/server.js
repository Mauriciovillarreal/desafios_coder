const fs = require('fs')
const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')

const path = require('path')
const app = express()
const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, error => {
    if (error) console.log(error)
    console.log('Server escuchando en el puerto 8080')
})

const io = new Server(httpServer)

let products = JSON.parse(fs.readFileSync('./Products.json'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '../src/views'))
app.set('view engine', 'handlebars')

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado')
    socket.emit('update-products', products)
    socket.on('add-product', (product) => {
        products.push(product)
        fs.writeFileSync('./Products.json', JSON.stringify(products, null, '\t'), 'utf-8')
        io.emit('update-products', products)
    })

    socket.on('delete-product', (productId) => {
        const id = parseInt(productId)
        products = products.filter(product => product.id !== id);
        fs.writeFileSync('./Products.json', JSON.stringify(products, null, '\t'), 'utf-8')
        io.emit('update-products', products)
    })
})

app.use('/', require('./routes/views.routes'))
app.use('/api/products', require('../src/routes/products.route'))
app.use('/api/carts', require('../src/routes/carts.routes'))

