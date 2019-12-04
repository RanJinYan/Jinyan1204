const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'backgroundManage';   //数据库名称
// 连接
const connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {
            useUnifiedTopology: true
        }, function (err, client) {
            err ? reject(err) : resolve(client);
            console.log("Connected successfully to server");
        });
    })
}

/*
    查   
    参数：第一个：数据库名称  '1909'
          第二个:查找的条件,空  / 一个对象{'a': 3}
    await find('1909');
    await find('1909', {'name': 'atdow'});
*/
const find = (col, query) => {
    return new Promise(async (resolve, reject) => {
        let client = await connect();
        const db = client.db(dbName);
        const collection = db.collection(col);
        //Find some documents
        //空:查找全部      {'a': 3}：查找a==3的数据
        collection.find(query ? query : {}).toArray(function (err, docs) {
            err ? reject(err) : resolve(docs);
        });
        client.close();
    })
}

// function findNew(query) {
//     return (
//         collection.find(query ? query : {}).toArray(function (err, docs) {
//             err ? reject(err) : resolve(docs);
//         })
//     );
// }
/*
    增    
    参数：第一个：数据库名称  '1909'
          第二个:添加的内容,一个数组,数组里的成员是对象 [{ a: 1 }, { a: 2 }, { a: 3 }]
    await insert('1909', [{'name': 'atdow'}]);
*/
const insert = (col, query) => {
    return new Promise(async (resolve, reject) => {
        let client = await connect();
        const db = client.db(dbName);
        const collection = db.collection(col);
        //Insert some documents
        //[{ a: 1 }, { a: 2 }, { a: 3 }]
        collection.insertMany(query, function (err, docs) {
            err ? reject(err) : resolve(docs);
        })
        client.close();
    })
}

/*
    改    
    参数：第一个：数据库名称  '1909'
          第二个:条件，一个对象：{ a: 2 }
          第三个：设置的内容，一个函数:{$set: { b: 1 } }
    await update('1909', {'name': 'atdow'}, {$set: {'name': 'yao'} });
*/
const update = (col, query1, query2) => {
    return new Promise(async (resolve, reject) => {
        let client = await connect();
        const db = client.db(dbName);
        const collection = db.collection(col);
        //Update document where a is 2, set b equal to 1
        // { a: 2 }, {$set: { b: 1 } }
        //query1,query2
        collection.updateOne(query1, query2, function (err, docs) {
            err ? reject(err) : resolve(docs);
        });
        client.close();
    })
}


/*
    删    
    参数：第一个：数据库名称  '1909'
          第二个:条件，一个对象：{ a : 3 }
    await remove('1909', {'name': 'atdow'});
*/
const remove = (col, query) => {
    return new Promise(async (resolve, reject) => {
        let client = await connect();
        const db = client.db(dbName);
        const collection = db.collection(col);
        //Delete document where a is 3
        //{ a : 3 }
        collection.deleteOne(query, function (err, docs) {
            err ? reject(err) : resolve(docs);
        });
        client.close();
    })
}

module.exports = {
    find,   //查找
    insert,   //插入
    update,   //修改
    remove     //删除
}