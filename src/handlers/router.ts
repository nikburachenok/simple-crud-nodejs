import http from 'http';
import url from 'url';

export const launchRouter = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    if (req.url) {
        const requestUrl = url.parse(req.url, true);
        if (req.method === 'GET' && requestUrl.path === '/api/users') {
            console.log('1111111');
            // getUsers(req, res);
        } else if (req.method === 'GET' && requestUrl.path?.startsWith('/api/users/')) {
            console.log('2222222');
            // getUserById(req, res, userId);
        } else if (req.method === 'POST' && requestUrl.path === '/api/users') {
            console.log('3333333');
            // saveUser(req, res);
        } else if (req.method === 'PUT' && requestUrl.path?.startsWith('/api/users/')) {
            console.log('4444444');
            // updateUser(req, res, userId);
        } else if (req.method === 'DELETE'&& requestUrl.path?.startsWith('/api/users/')) {
            console.log('5555555');
            // removeUser(req, res, userId);
        } else {
            // 404
        }
    }
}