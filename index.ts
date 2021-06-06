import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from "path";

// 创建Server
const server = http.createServer();

const publicDirPath = p.resolve(__dirname, 'public');

// 监听request
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {method, url: path, headers} = request;
    const {pathname} = new URL(path, `https://${request.headers.host}`);

    fs.readFile(publicDirPath + pathname, (err, data) => {
        if (err) {
            response.statusCode = 404;
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end("文件不存在");

            // throw err;
        }

        response.end(data);
    });
});

// 监听端口
server.listen(8888, () => {
    console.log("Address：", server.address());
});
