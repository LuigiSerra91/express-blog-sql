const express = require('express')
const app = express()
const HOST = process.env.HOST
const PORT = process.env.PORT
const animeRouter = require('./routers/routerAnime.js')
const notFoundMiddleware = require('./middleware/notFoundMiddleware.js')
const logger = require('./middleware/loggerMiddleware.js')
const error500 = require('./middleware/error500.js')
app.use(express.json())
app.listen(PORT , () =>{
    console.log(`this server is on in${HOST}:${PORT}`);
    
})
app.use('/', logger)
app.get('/', (req, res)=>{
    res.send('ciao')
})


app.use('/anime', animeRouter)




app.use(notFoundMiddleware)

app.use(error500)




