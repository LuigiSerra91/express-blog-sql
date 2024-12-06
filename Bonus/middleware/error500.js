const error500 = (err, req, res, next) => {
    console.log("Error: ", err.message);
    // this prints the stack trace of the error
    console.error(err.stack);
    res.status(500).send({
      message: "Something went wrong",
      error: err.message
    })
  };

  module.exports = error500