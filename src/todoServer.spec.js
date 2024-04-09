const { getTodos } = require('./todoServer')

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