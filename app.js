const express = require('express')
const app = express()
app.use(express.static('public'))
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const cors = require('cors')
const employeesRouter = require('./routers/router.js')
const notFoundMiddleware = require('./middleware/notFoundMiddleware.js')
const logger = require('./middleware/loggerMiddleware.js')
const error500 = require('./middleware/error500.js')
app.use(express.json())
app.use(cors())
app.listen(PORT, ()=> {
    console.log(`server started on ${HOST}:${PORT}`);
    
})
app.use('/', logger)
app.get('/',(req, res)=> {
    res.send('<h1>il mio blog</h1>')
})

app.use('/post', employeesRouter)


app.use(notFoundMiddleware)

app.use(error500)