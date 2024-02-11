import { User } from "./model";
import * as uuid from 'uuid';

let users = new Array<User>;

export const getUsersDBL = () => {
    return users;
};

export const getUserByIdDBL = (userId: string) => {
    return users.find((user) => user.id === userId);
};


export const saveUserDBL = (user: User) => {
    user.id = uuid.v4();
    users.push(user);
    return user.id;
};

const updateUser = (userId: string, updatedUser: User) => {
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
            ...updatedUser,
            id: userId,
        };
        return users[userIndex];
    } else {
        return null;
    }
};

const removeUser = (userId: string) => {
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        return users.splice(userIndex, 1)[0];
    } else {
        return null; // Indicate that the product was not found
    }
};
