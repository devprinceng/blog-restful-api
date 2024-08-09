//resource not found controller
const notFoundController = (req, res, next) => {

    res.status(404).json({code: 404, status: false, message: 'Api not found'});
}

module.exports = notFoundController;