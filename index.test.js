const expressTraceId = require('./index');
const { v1: uuidv1 } = require('uuid');

jest.mock('uuid');

describe('express-traceid middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = { set: jest.fn() };
    next = jest.fn();
  });

  test('adds traceId to request object', () => {
    const mockUuid = '123e4567-e89b-12d3-a456-426614174000';
    uuidv1.mockReturnValue(mockUuid);

    expressTraceId(req, res, next);

    expect(req.traceId).toBe(mockUuid);
  });

  test('sets X-Trace-Id header in response', () => {
    const mockUuid = '123e4567-e89b-12d3-a456-426614174000';
    uuidv1.mockReturnValue(mockUuid);

    expressTraceId(req, res, next);

    expect(res.set).toHaveBeenCalledWith('X-Trace-Id', mockUuid);
  });

  test('calls next middleware', () => {
    expressTraceId(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('generates unique traceId for each request', () => {
    const mockUuid1 = '123e4567-e89b-12d3-a456-426614174000';
    const mockUuid2 = '987e6543-e21b-12d3-a456-426614174000';
    uuidv1.mockReturnValueOnce(mockUuid1).mockReturnValueOnce(mockUuid2);

    expressTraceId(req, res, next);
    const firstTraceId = req.traceId;

    req = {};
    res = { set: jest.fn() };
    expressTraceId(req, res, next);
    const secondTraceId = req.traceId;

    expect(firstTraceId).not.toBe(secondTraceId);
  });
});
