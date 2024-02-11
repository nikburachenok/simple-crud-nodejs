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
        const urlParameters = requestUrl.path?.split('/');
        if (!urlParameters) {
            sendResponse(
                res,
                500,
                { "Content-Type": "application/json" },
                'Server cannot handle this URL, please use correct URL'
            );
            return;
        }

        if (req.method === 'GET' && requestUrl.path === '/api/users') {
            getUsers(res)
        } else if (req.method === 'GET' && requestUrl.path?.startsWith('/api/users/')) {
            getUserById(req, res, urlParameters[3]);
        } else if (req.method === 'POST' && requestUrl.path === '/api/users') {
            saveUser(req, res);
        } else if (req.method === 'PUT' && requestUrl.path?.startsWith('/api/users/')) {
            updateUser(req, res, urlParameters[3]);
        } else if (req.method === 'DELETE'&& requestUrl.path?.startsWith('/api/users/')) {
            removeUser(req, res, urlParameters[3]);
        } else {
            sendResponse(
                res,
                404,
                { "Content-Type": "application/json" },
                'Server cannot handle this URL, please use correct URL'
            );
        }
    }
}