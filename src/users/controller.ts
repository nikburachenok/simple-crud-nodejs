import http from 'http';
import * as uuid from 'uuid';
import { sendResponse } from '../handlers/responseSender';
import { getUsersDBL, saveUserDBL } from './repository';
import { User } from "./model";

export const getUsers = (res: http.ServerResponse<http.IncomingMessage>) => {
    sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(getUsersDBL()));
}

export const getUserById = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, userId: string) => {
    if (!uuid.validate(userId)){
        sendResponse(
            res,
            400,
            { "Content-Type": "application/json" },
            'User Id is incorrect'
        );
        return;
    }
    // Get user by Id
}

export const saveUser = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    let requestBody = '';
    req.on('data', (chunk) => {
        requestBody += chunk;
    });
    req.on('end', () => {
        try {
            const { username, age, hobbies} = JSON.parse(requestBody);
            let isValidInput =
                typeof username === 'string' &&
                typeof age === 'number' &&
                Array.isArray(hobbies) &&
                !hobbies?.find((item: any) => {
                    return typeof item !== 'string';
                });
            if (isValidInput) {
                const user = JSON.parse(requestBody) as User;
                const newUserId = saveUserDBL(user);
                sendResponse(
                    res,
                    201,
                    { "Content-Type": "application/json" }, `The new user was saved with id:${newUserId}`
                );
            } else {
                sendResponse(
                    res,
                    400,
                    { "Content-Type": "application/json" },
                    'The new user record does not contain one of the following required parameters or has wrong type of parameter'
                );
            }
        } catch (error) {
            sendResponse(
                res,
                400,
                { "Content-Type": "application/json" },
                'The new user record does not contain one of the following required parameters or has wrong type of parameter'
            );
        }
    });
}

export const updateUser = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, userId: string) => {
    if (!uuid.validate(userId)){
        sendResponse(
            res,
            400,
            { "Content-Type": "application/json" },
            'User Id is incorrect'
        );
        return;
    }
    // Update user
}

export const removeUser = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, userId: string) => {
    if (!uuid.validate(userId)){
        sendResponse(
            res,
            400,
            { "Content-Type": "application/json" },
            'User Id is incorrect'
        );
        return;
    }
    // Remove user
}

// const validateFields = (user: User) {

// }
