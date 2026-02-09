//handle not found error
const notFound = (req, res, next) => {
    const error = new Error('Not found-${req.originalUrl}')
    res.status(404);
    next(error);
};
// global error handler
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    let message = err.message;
    //mongoose validation error
    if (err.name == "CastError" && err.kind == "ObjectId") {
        statusCode = 404;
        message = "Resource not found";

    }
}
module.exports = { notFound, errorHandler };