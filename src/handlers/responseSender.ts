import http from 'http';
import cluster from 'cluster';
import dotenv from 'dotenv';
dotenv.config();

export const sendResponse = (
    res: http.ServerResponse<http.IncomingMessage>,
    statusCode: number, contentType: http.OutgoingHttpHeaders | http.OutgoingHttpHeader[] | undefined,
    data: any
) => {
    if (!cluster.isPrimary) {
        if (process.send) {
            process.send({type: 'response', statusCode, contentType, data});
        }
    } else {
        res.writeHead(statusCode, contentType);
        res.end(JSON.stringify(data));
    }
};