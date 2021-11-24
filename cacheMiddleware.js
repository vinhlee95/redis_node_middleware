const redis = require('redis')
const client = redis.createClient({
    url: 'http://localhost:6380'
})

client.on_error(err => {
    console.log('Error creating Redis client', err)
})

module.exports.cacheMiddleware = (req, res, next) => {
    const key = 'cache_' + req.originalUrl || req.url

    // Try to get cached response
    client.get(key, (err, reply) => {
        if(reply) return res.send(reply)

        res.sendResponse = res.send
        res.send = (body) => {
            // Save response to cache
            client.set(key, JSON.stringify(body))
            res.sendResponse(body)
        }

        next()
    })
}