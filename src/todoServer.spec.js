const { getTodos, getPMA1TestCaseInfo, getPMA1TestCaseExecution } = require('./mockServer')

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

    it('should get the todos', async () => {
        await getPMA1TestCaseInfo(mockRequest, mockResponse)
        expect(mockResponse.json).toHaveBeenCalledWith([
            {
                "id":27503627,
                "key":"PMA1-T16",
                "name":"Create a New Project @smoke",
                "project":
                {
                    "id":129674,
                    "self":"https://api.zephyrscale.smartbear.com/v2/projects/129674"
                },
                "createdOn":"2022-08-10T09:20:23Z",
                "objective":"<br /><br />",
                "precondition":"<table style=\"width:24%;margin-right:calc(76%)\"><tbody><tr><td style=\"width:50.1845%\">Charge code</td><td style=\"width:50.1845%\">Type</td></tr><tr><td style=\"width:50.1845%\">Z8WYSB<br /></td><td style=\"width:50.1845%\">Testing<br /></td></tr><tr><td style=\"width:50.1845%\">9022WQ<br /></td><td style=\"width:50.1845%\">Client Engagement<br /></td></tr><tr><td style=\"width:50.1845%\"><div>PP0001</div></td><td style=\"width:50.1845%\">PE</td></tr><tr><td style=\"width:50.1845%\"><div>Z0FTZO</div></td><td style=\"width:50.1845%\">Internal</td></tr><tr><td style=\"width:50.1845%\"><div>Z0BTZY</div></td><td style=\"width:50.1845%\">Free ( Training or recruiting)</td></tr><tr><td style=\"width:50.1845%\">Z0WVLB<br /></td><td style=\"width:50.1845%\">Outdated<br /></td></tr><tr><td style=\"width:50.1845%\">9022FX<br /></td><td style=\"width:50.1845%\">Outdated(Client Engagement)<br /></td></tr></tbody></table><br />",
                "estimatedTime":null,
                "labels":[
                    "Smoke","e2e_ui","devex"
                ],
                "component":null,
                "priority":{
                    "id":2381909,
                    "self":"https://api.zephyrscale.smartbear.com/v2/priorities/2381909"
                },
                "status":{
                    "id":2381907,
                    "self":"https://api.zephyrscale.smartbear.com/v2/statuses/2381907"
                },
                "folder":{
                    "id":3251612,
                    "self":"https://api.zephyrscale.smartbear.com/v2/folders/3251612"
                },
                "owner":null,
                "testScript":{
                    "self":"https://api.zephyrscale.smartbear.com/v2/testcases/PMA1-T16/testscript"
                },
                "customFields":{
                    "Execution type":"Automated",
                    "Component":[
                        "Project"
                    ]
                },
                "links":{
                    "self":"https://api.zephyrscale.smartbear.com/v2/testcases/PMA1-T16/links",
                    "issues":[],
                    "webLinks":[]
                }
            }
        ])
    })
})

describe('test get case execution', () => {
    it('should return response', async () => {
        await getPMA1TestCaseExecution(mockRequest, mockResponse)
        expect(mockResponse.json).toHaveBeenCalledTimes(1)
    })
})