const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    if (pathName === "/") {
        // Serve halaman Landing Page
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("File not found");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    } else if (pathName === "/cars") {
        // Serve halaman Cari Mobil
        fs.readFile("cariMobil.html", (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("File not found");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
