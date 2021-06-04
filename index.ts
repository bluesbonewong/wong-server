import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from "path";

// 创建Server
const server = http.createServer();

const publicDirPath = p.resolve(__dirname, 'public');

// 监听request
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {method, url, headers} = request;
    console.log(url);

    switch (url) {
        case "/index.html":
            fs.readFile(publicDirPath + url, (err, data) => {
                if (err) throw err;
                response.end(data);
            });
            break;
        case "/style.css":
            response.setHeader("Content-Type", "text/css; charset=utf-8"); // 不同的文件的content-type最好设置一下
            fs.readFile(publicDirPath + url, (err, data) => {
                if (err) throw err;
                response.end(data);
            });
            break;
        case "/main.js":
            response.setHeader("Content-Type", "text/javascript; charset=utf-8");
            fs.readFile(publicDirPath + url, (err, data) => {
                if (err) throw err;
                response.end(data);
            });
    }
});

// 监听端口
server.listen(8888, () => {
    console.log("Address：", server.address());
});
