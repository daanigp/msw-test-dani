const { getPMA1TestCaseInfo, getPMA1TestCaseExecution, getPMA1TestStatus } = require('./mockServer')

const mockResponse = {
    json: jest.fn(),
    status: jest.fn()
}

const mockRequest = jest.fn()

describe('test get case info', () => {
    it('should return response', async () => {
        await getPMA1TestCaseInfo(mockRequest, mockResponse)
        expect(mockResponse.json).toHaveBeenCalledTimes(1)
    })
})

describe('test get case execution', () => {
    it('should return response', async () => {
        await getPMA1TestCaseExecution(mockRequest, mockResponse)
        expect(mockResponse.json).toHaveBeenCalledTimes(1)
    })
})

describe('test get status', () => {
    it('should return response', async () => {
        await getPMA1TestStatus(mockRequest, mockResponse)
        expect(mockResponse.json).toHaveBeenCalledTimes(1)
    })
})