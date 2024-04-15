const { getTodos, getPMA1TestCaseInfo, getPMA1TestCaseExecution, getPMA1TestStatus } = require('./mockServer')

const mockResponse = {
    json: jest.fn(),
    status: jest.fn()
}

const mockRequest = jest.fn()

describe('test todos', () => {
    it('should return response', async () => {
        await getTodos(mockRequest, mockResponse)
        expect(mockResponse.json).toHaveBeenCalledTimes(1)
    })

    it('should get the todos', async () => {
        await getTodos(mockRequest, mockResponse)
        expect(mockResponse.json).toHaveBeenCalledWith([
            {
                "userId": 1,
                "id": 1,
                "title": "delectus aut autem",
                "completed": false
            },
            {
                "userId": 1,
                "id": 2,
                "title": "quis ut nam facilis et officia qui",
                "completed": false
            },
            {
                "userId": 1,
                "id": 3,
                "title": "fugiat veniam minus",
                "completed": false
            }
        ])
    })
})

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