import http from 'http';

export const sendResponse = (
    res: http.ServerResponse<http.IncomingMessage>,
    statusCode: number, contentType: http.OutgoingHttpHeaders | http.OutgoingHttpHeader[] | undefined,
    message: String
) => {
    res.writeHead(statusCode, contentType);
    res.end(JSON.stringify(message));
};