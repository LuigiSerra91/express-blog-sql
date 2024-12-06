const  notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        status: 404,
        error: 'page not is found'
    })
}

module.exports = notFoundMiddleware