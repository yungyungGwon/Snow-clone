const fs = require('fs');
const https = require('https');
const next = require('next');
const { parse } = require('url');
const express = require('express');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const port = 4040;

const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() =>
{
    const server = express();
    server.disable("x-powered-by");
    server.use(cookieParser());

    // HMR event process setting according to 'nextJS' version update.
    server.all('/_next/webpack-hmr',(req,res) => {
        nextjsRequestHandler(req,res);
    });

    if (dev)
    {
        const httpsOptions = {
            key: fs.readFileSync('./virnect.key'),
            cert: fs.readFileSync('./virnect.crt')
        };

        https.createServer(httpsOptions, async (req, res) =>
        {
            const parseUrl = parse(req.url, true);
            await handle(req, res, parseUrl);
        }).listen(port, (err) =>
        {
            if (err) throw  err;
            console.log(`Server Listening https://localhost:${port}`);
        });
    }
});