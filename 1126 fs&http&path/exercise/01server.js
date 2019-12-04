const http = require('http');
http.createServer((res, req) => {
    //响应头
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    });
    //响应体后响应结束res.end(data);
    //data 是响应的内容，即返回给前端的数据
    res.end('你好');
}).listen(11260, () => {
    console.log('服务器开启成功');
});