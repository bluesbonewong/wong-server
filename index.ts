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
    let {pathname} = new URL(path, `https://${request.headers.host}`);
    pathname = pathname === "/" ? "/index.html" : pathname; // 对直接访问域名进行容错

    fs.readFile(publicDirPath + pathname, (err, data) => {
        if (err) {
            console.log(err);
            if (err.errno === -2) { // 文件或目录不存在的errno
                // 返回404网页
                response.statusCode = 404;
                fs.readFile(publicDirPath + "/404.html", (err1, html404) => {
                    response.end(html404);
                });
            } else {
                response.statusCode = 500;
                response.setHeader("Content-Type", "text/plain; charset=utf-8");
                response.end("服务器繁忙");
            }
        } else {
            response.end(data);
        }
    });
});

// 监听端口
server.listen(8888, () => {
    console.log("Address：", server.address());
});
