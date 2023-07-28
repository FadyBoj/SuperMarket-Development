const notFoundMiddleware = (req,res) =>{
    return res.status(404).send(`<h1>Oops, Seems like we can\'t find the page you\'re looking for</h1>
                          <h2><a href='/'>Home</a><h2>`)
}

module.exports = notFoundMiddleware;