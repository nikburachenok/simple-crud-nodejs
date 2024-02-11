import http from 'http';
import * as uuid from 'uuid';
import { sendResponse } from '../handlers/responseSender';
import {
    getUsersDBL,
    saveUserDBL,
    getUserByIdDBL,
    removeUserDBL,
    updateUserDBL
} from './repository';
import { User } from "./model";

export const getUsers = (res: http.ServerResponse<http.IncomingMessage>) => {
    sendResponse(res, 200, { "Content-Type": "application/json" }, getUsersDBL());
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
    const user = getUserByIdDBL(userId);
    if (user) {
        sendResponse(
            res,
            200,
            { "Content-Type": "application/json" },
            user
        );
    } else {
        sendResponse(
            res,
            404,
            { "Content-Type": "application/json" },
            `User with id equals ${userId} does not exists`
        );
    }
}

export const saveUser = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    let requestBody = '';
    req.on('data', (chunk) => {
        requestBody += chunk;
    });
    req.on('end', () => {
        try {
            const { username, age, hobbies, id} = JSON.parse(requestBody);
            let isValidInput =
                typeof username === 'string' &&
                typeof age === 'number' &&
                Array.isArray(hobbies) &&
                !hobbies?.find((item: any) => {
                    return typeof item !== 'string';
                });
            if (id) {
                sendResponse(
                    res,
                    500,
                    { "Content-Type": "application/json" },
                    `You cannot set user id. This parameter will be set automatically`
                );
                return;
            }
            if (isValidInput) {
                const user = JSON.parse(requestBody) as User;
                const newUserId = saveUserDBL(user);
                sendResponse(
                    res,
                    201,
                    { "Content-Type": "application/json" },
                    `The new user was saved with id:${newUserId}`
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
                500,
                { "Content-Type": "application/json" },
                'Cannot process sended record'
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

    let requestBody = '';
    req.on('data', (chunk) => {
        requestBody += chunk;
    });
    req.on('end', () => {
        try {
            const { username, age, hobbies, id} = JSON.parse(requestBody);
            let isValidInput =
                typeof username === 'string' ||
                typeof age === 'number' ||
                (   Array.isArray(hobbies) &&
                    !hobbies?.find((item: any) => {
                        return typeof item !== 'string';
                    })
                );

            if (id) {
                sendResponse(
                    res,
                    500,
                    { "Content-Type": "application/json" },
                    `You cannot update user id`
                );
                return;
            }
            if (isValidInput) {
                const user = JSON.parse(requestBody) as User;
                const updatedUser = updateUserDBL(userId, user);
                if (updatedUser) {
                    sendResponse(
                        res,
                        200,
                        { "Content-Type": "application/json" },
                        updatedUser
                    );
                } else {
                    sendResponse(
                        res,
                        404,
                        { "Content-Type": "application/json" },
                        `User with id equals ${userId} does not exists`
                    );
                }
            } else {
                sendResponse(
                    res,
                    500,
                    { "Content-Type": "application/json" },
                    'The new user record does not contain one of the following required parameters or has wrong type of parameter'
                );
            }
        } catch (error) {
            sendResponse(
                res,
                500,
                { "Content-Type": "application/json" },
                'Cannot process sended record'
            );
        }
    });
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
    const removedUserId = removeUserDBL(userId);
    if (removedUserId) {
        sendResponse(
            res,
            200,
            { "Content-Type": "application/json" },
            `User with id equals ${removedUserId} was successfully removed`
        );
    } else {
        sendResponse(
            res,
            404,
            { "Content-Type": "application/json" },
            `User with id equals ${userId} does not exists`
        );
    }
}
