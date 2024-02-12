import fs from 'fs';
import path from 'path';
import UserRepository from "./src/users/repository";
import * as uuid from 'uuid';

describe('check server', () => {
    beforeAll(async () => {
        fs.writeFile(path.resolve('./src/users/', 'db.json'), '[]', () => {})
    })

    afterAll(async () => {
        fs.writeFile(path.resolve('./src/users/', 'db.json'), '[]', () => {})
    })

    test('Testing of getUsersDBL()', async () => {
        let userRepository = new UserRepository();
        const response = await userRepository.getUsersDBL();
        console.log(response);
        expect(response).toEqual([]);
    });

    test('Testing saveUserDBL()', async () => {
        let userRepository = new UserRepository();
        let userId = await userRepository.saveUserDBL({
            username: "test",
            age: 10,
            hobbies: ["hobby1", "hobby2"]
        });
        expect(!!userId).toBeTruthy();
        expect(uuid.validate(userId)).toBeTruthy();
    });

    test('Testing getUserByIdDBL', async () => {
        let userRepository = new UserRepository();
        let userId = await userRepository.saveUserDBL({
            username: "test",
            age: 10,
            hobbies: ["hobby1", "hobby2"]
        });

        const newUser = await userRepository.getUserByIdDBL(userId);
        const {username, age} = newUser
        expect(username).toBe("test");
        expect(age).toBe(10);
    });
});