// Live streaming server

import express, { Express, Request, Response }  from "express";
import { createReadStream, statSync } from "fs" 
import { resolve } from 'path';
import winston, { format } from "winston";
import dotenv from 'dotenv';

dotenv.config();

// set up logging
const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(), // colored o/p
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
})

// set up the app
const app: Express = express();
const PORT = process.env.PORT || 8000;

// serve the main file
app.get("/", (req: Request, res: Response) => {
    logger.info('Serving file...');
    res.sendFile(resolve("./index.html"));
});

// get video size
const getVideoSize = (videoPath: string) => {
    return statSync(videoPath).size;
}

// server video in chunks of 1MB
app.get("/video", (req: Request, res: Response) => {
    const range = req.headers.range;
    if (!range) {
        logger.error('Improper request...');
        res.status(400).send("Requires range header");
    }

    const videoPath = resolve('./video/bigbuck.mp4');
    const videoSize = getVideoSize(videoPath);

    const CHUNK_SIZE = 10 ** 6; // 1MB 
    const start = Number(range?.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    logger.info(`Requested video from ${start} till ${end} bytes`);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    const videoStream = createReadStream(videoPath, {start, end});
    videoStream.pipe(res);

})

// run server 
app.listen(PORT, () => console.log(`Running on port ${PORT}`))