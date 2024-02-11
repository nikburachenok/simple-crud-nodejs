import http from 'http';

export const sendResponse = (
    res: http.ServerResponse<http.IncomingMessage>,
    statusCode: number, contentType: http.OutgoingHttpHeaders | http.OutgoingHttpHeader[] | undefined,
    data: any
) => {
    res.writeHead(statusCode, contentType);
    res.end(JSON.stringify(data));
};