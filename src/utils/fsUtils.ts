import fsPr from 'fs/promises';
import { join, dirname } from 'path';

export const readFile = async() => {
    let info = await fsPr.readFile(join(dirname(__dirname), 'users', 'db.json'));
    return info;
}

export const writeFile = async(data: string) => {
    await fsPr.writeFile(join(dirname(__dirname), 'users', 'db.json'), data);
}