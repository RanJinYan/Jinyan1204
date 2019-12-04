var http = require("http");
var fs = require("fs");

var url = "http://i1.shaodiyejin.com/uploads/tu/201908/10345/z6c16.jpg ";

http.get(url, function (res) {
    var imgData = "";
    res.setEncoding("binary");
    //一定要设置response的编码为binary否则会下载下来的图片打不开
    res.on("data", function (chunk) {
        imgData += chunk;
    });
    res.on("end", function () {
        fs.writeFile(`./img/${5}.jpg`, imgData, "binary", function (err) {
            if (err) {
                console.log("down fail");
            } else {
                console.log("down success");
            }
        });
    });
});