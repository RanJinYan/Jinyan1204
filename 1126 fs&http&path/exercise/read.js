const fs = require('fs');
let str = '';
//fs.readFile(path,callback(err,data));
//path 是被读取文件的路径，err是错误的原因，data是读取的内容，
fs.readFile('./mydata.txt', (err, data) => {
    str = data.toString();
    // 如果要将读取的内容写入另一个文件，那么写入的函数必须写在读取的内部，fs.writeFile 是覆盖写入，会覆盖文件中已有的内容
    // fs.writeFile('./new.txt', str, err => {
    //     if (err) throw err;
    //     console.log('写入成功');
    // });
    //追加写入，会在文件原有的基础之上添加
    fs.appendFile('./new.txt', str, err => {
        if (err) throw err;
        console.log(str);
    });
});
//得不到读取的str数据
console.log('这是：' + str);
//如果是写在读取文件的外部，那么就永远不能直接拿到数据写入文件
// fs.writeFile('./new.txt', str, err => {
//     if (err) throw err;
//     console.log('写入成功');
// });
