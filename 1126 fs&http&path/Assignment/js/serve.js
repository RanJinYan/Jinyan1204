const http = require('http');
const request = require('request');
http.createServer((req, res) => {
    //请求体
    request('https://m.toutiao.com/list/?tag=video&ac=wap&count=20&format=json_raw&as=A185AD7D4C7F7A7&cp=5DDC9F375AC7FE1&min_behot_time=0&_signature=KgjgiwAAd9vC0sL2-gNKnSoI4J&i=', (res2, err, req) => {
        //响应头
        res.writeHead('200', {
            'Access-Control-Allow-Origin': '*'
        });
        //响应体，返回数据
        res.end(req);
    });
}).listen('0911', () => {
    console.log('服务器已开启');
});
