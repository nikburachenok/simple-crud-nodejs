import http from 'http';
import url from 'url';
import {
    getUserById,
    getUsers,
    saveUser,
    updateUser,
    removeUser
} from '../users/controller';
import { sendResponse } from './responseSender';

export const launchRouter = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    if (req.url) {
        const requestUrl = url.parse(req.url, true);
        if (req.method === 'GET' && requestUrl.path === '/api/users') {
            getUsers(req, res)
        } else if (req.method === 'GET' && requestUrl.path?.startsWith('/api/users/')) {
            getUserById(req, res, '');
        } else if (req.method === 'POST' && requestUrl.path === '/api/users') {
            saveUser(req, res);
        } else if (req.method === 'PUT' && requestUrl.path?.startsWith('/api/users/')) {
            updateUser(req, res, '');
        } else if (req.method === 'DELETE'&& requestUrl.path?.startsWith('/api/users/')) {
            console.log('5555555');
            removeUser(req, res, '');
        } else {
            sendResponse(res, 500, { "Content-Type": "application/json" }, 'Server cannot handle this URL, please use correct URL')
        }
    }
}