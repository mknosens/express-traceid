Adds a traceid to your Express request

* Uses UUID v1 to generate a new trace id for each request
* Sets it in the Express request object (req.traceId), which can be used by the logger in the code
* Sets it in the Express response header ('X-Trace-Id'), which can be shown to the consumer when things fail
