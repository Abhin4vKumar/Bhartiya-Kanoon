module.exports = asyncErrorFunc => (req, res, next) => {
    Promise.resolve(asyncErrorFunc(req, res, next)).catch(next);
}