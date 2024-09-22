const { v1: uuidv1 } = require('uuid');

module.exports = (req, res, next) => {
    req.traceId = uuidv1();
    res.set('X-Trace-Id', req.traceId);
    next();
};
