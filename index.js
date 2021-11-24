const express = require('express')
const {cacheMiddleware} = require("./cacheMiddleware");
const app = express()
const PORT = 8080

app.listen(PORT, () => {
    console.log(`App is running in port ${PORT}`)
})


app.get('/stores', cacheMiddleware, (req, res) => {
    const stores = [
        {id: 1, name: 'Apple'},
        {id: 1, name: 'Samsung'},
    ]

    const foo = 'bar'

    res.status(200).json(stores)
})