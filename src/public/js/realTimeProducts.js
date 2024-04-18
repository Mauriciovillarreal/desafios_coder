const socket = io()

document.getElementById('add-product-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const title = document.getElementById('product-title').value
    const priceInput = document.getElementById('product-price')
    const price = parseFloat(priceInput.value)
    const idInput = document.getElementById('product-id')
    const id = parseFloat(idInput.value)
    if (isNaN(price, id)) {
        alert('Invalid price value')
        return
    }
    socket.emit('add-product', { title, price, id })
    document.getElementById('add-product-form').reset()
})

document.getElementById('delete-product-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const id = document.getElementById('delete-product-id').value
    if (isNaN(id)) {
        alert('Invalid product ID')
        return
    }
    socket.emit('delete-product', id)
    document.getElementById('delete-product-form').reset()
})

socket.on('update-products', (products) => {
    const productsList = document.getElementById('products-list')
    productsList.innerHTML = ''
    products.forEach((product) => {
        const li = document.createElement('li')

        li.textContent = `
        ${product.title}  -  
        id:${product.id} -
         $${product.price}`
        productsList.appendChild(li)
    })
})

