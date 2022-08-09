const { v4: uuidv4 } = require('uuid');

module.exports = (req, res, next) => {
    req.traceId = uuidv4();
    res.set('X-Trace-Id', req.traceId);
    next();
}
