import http from 'http';
import dotenv from 'dotenv';
import { launchRouter } from './handlers/router';

dotenv.config();
const { MAIN_PORT } = process.env;

const server = http.createServer((req, res) => {
    launchRouter(req, res);
});

server.listen(MAIN_PORT, () => {
    console.log(`Server listening on http://localhost:${MAIN_PORT}`);
});

