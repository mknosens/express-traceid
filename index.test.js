const expressTraceId = require('./index');
const { v1: uuidv1 } = require('uuid');

jest.mock('uuid');

describe('express-traceid middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { get: jest.fn() };
    res = { set: jest.fn() };
    next = jest.fn();
  });

  test('adds UUID v1 traceId to request object', () => {
    const mockUuid = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';
    uuidv1.mockReturnValue(mockUuid);

    expressTraceId(req, res, next);

    expect(req.traceId).toBe(mockUuid);
  });

  test('sets X-Trace-Id header in response', () => {
    const mockUuid = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';
    uuidv1.mockReturnValue(mockUuid);

    expressTraceId(req, res, next);

    expect(res.set).toHaveBeenCalledWith('X-Trace-Id', mockUuid);
  });

  test('calls next middleware', () => {
    expressTraceId(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('generates unique traceId for each request', () => {
    const mockUuid1 = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';
    const mockUuid2 = '7ec0bd7f-11c0-43da-975e-2a8ad9ebae0c';
    uuidv1.mockReturnValueOnce(mockUuid1).mockReturnValueOnce(mockUuid2);

    expressTraceId(req, res, next);
    const firstTraceId = req.traceId;

    req = { get: jest.fn() };
    res = { set: jest.fn() };
    expressTraceId(req, res, next);
    const secondTraceId = req.traceId;

    expect(firstTraceId).not.toBe(secondTraceId);
  });
});
