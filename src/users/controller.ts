import http from 'http';

export const getUsers = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    // Get all users
}

export const getUserById = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, userId: String) => {
    // Get user by Id
}

export const saveUser = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    // Save new user
}

export const updateUser = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, userId: String) => {
    // Update user
}

export const removeUser = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, userId: String) => {
    // Remove user
}