const http = require('http');
const fs = require('fs');
const jQuery = require('jquery');
// const path = require('path');
const request = require('request');
const { JSDOM } = require('jsdom');
const mock = (html) => {
    const { window } = new JSDOM(html);
    let $ = jQuery(window);
    return $;
}
http.get('http://www.umei.cc/p/gaoqing/cn/', res => {
    res.setEncoding('utf-8');
    let strData = '';
    res.on('data', chunk => {
        strData += chunk;
    });
    res.on('end', () => {
        let $ = mock(strData);
        $("img").each((index, element) => {
            //图片的地址
            let url = $(element).attr('src');
            http.get(url, function (res) {
                let imgData = "";
                //一定要设置response的编码为binary否则会下载下来的图片打不开
                res.setEncoding("binary");
                res.on("data", function (chunk) {
                    imgData += chunk;
                });
                res.on("end", function () {
                    //用request请求就不需要去更改fs中path，同时也不用在乎path是否可以改为变量，直接使用request管道获取数据流，然后再存放到文件夹中
                    //尝试 2222 成功
                    //let pathName = path.basename(url);
                    //成功的存入数据 
                    //request(url).pipe(fs.createWriteStream('./img/' + pathName));

                    //尝试 3333，改名
                    if (index < 10) {
                        request(url).pipe(fs.createWriteStream('./image/' + `0${index}.jpg`));
                    } else {
                        request(url).pipe(fs.createWriteStream('./image/' + `${index}.jpg`));
                    }

                    //失败的尝试1111，目的：通过改变path达到把不同数据存储到不同文件中
                    // fs.writeFile(`'./img/0${index}.jpg'`, imgData, "binary", function (err) {
                    //     if (err) {
                    //         console.log("下载失败");
                    //     } else {
                    //         console.log("下载成功");
                    //     }
                    // });
                });
            });
        });
    });
});