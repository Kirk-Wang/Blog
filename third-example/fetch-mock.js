const fetchMock = require('fetch-mock');

// hack native(fetch) implementation
fetchMock.mock('http://example.com', () => {
    // body
    return {
        hello: 'world!'
    };
});

async function mockRequest() {
    let res = await fetch('http://example.com');
    console.log(res);
    // restore fetch() to its native implementation 
    fetchMock.restore();
    console.log('---------------Unmatched--------------');
    res = await fetch('http://example.com');
    console.log(res);
}

mockRequest();

