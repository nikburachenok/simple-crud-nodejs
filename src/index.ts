import http from 'http';
import dotenv from 'dotenv';
import { launchRouter } from './handlers/router';
import { writeFile } from './utils/fsUtils';
import cluster from 'cluster';
import { availableParallelism } from 'os';
import { sendResponse } from './handlers/responseSender';

const server = http.createServer();
dotenv.config();
const MAIN_PORT  = Number(process.env.MAIN_PORT) || 4000;
let APPLICATION_MODE = process.argv.find(item => item.startsWith('--mode'));
if (APPLICATION_MODE) {
    APPLICATION_MODE = APPLICATION_MODE.slice(7);
}

const workers: any[] = [];
let nextWorker = 0;

try {
    if (APPLICATION_MODE === 'cluster') {
        if (cluster.isPrimary) {
            for (let i = 0; i < availableParallelism(); i++) {
                workers.push(cluster.fork({ MAIN_PORT: MAIN_PORT + 1 + i }));
            }

            server.listen(MAIN_PORT, async () => {
                await writeFile('[]');
                console.log(` Worker server ${process.pid} listening on http://localhost:${MAIN_PORT}. PLEASE WAITING FOR WORKERS!!!`);
            });
            server.on('request', async (req, res) => {
                if (req.method === 'GET' ||  req.method === 'DELETE') {
                    workers[nextWorker].send({ type: 'request', data: { url: req.url, method: req.method, data: null } });
                    nextWorker < Object.values(workers).length - 1 ? nextWorker++ : nextWorker = 0;
                } else {
                    req.on('data', (d) => {
                        const data = d.toString();
                        workers[nextWorker].send({ type: 'request', data: { url: req.url, method: req.method, data } });
                        nextWorker < Object.values(workers).length - 1 ? nextWorker++ : nextWorker = 0;
                    })
                }
                cluster.once('message', (worker: any, message: any) => {
                    if (message.type === 'response') {
                        const {statusCode, contentType, data} = message;
                        sendResponse(res, statusCode, contentType, data);
                    }
                });
            })
            process.on('SIGINT', async () => {
                await writeFile('[]');
                process.exit();
            });
        } else {
            server.listen(MAIN_PORT, async () => {
                await writeFile('[]');
                console.log(`Worker ${process.pid} listening on http://localhost:${MAIN_PORT}`);
            });
            server.on('request', async (req, res) => {
                await launchRouter(req, res);
            });

            process.on('message', (message: any) => {
                const postData = JSON.stringify(message.data.data);
                const options = {
                    hostname: 'localhost',
                    port: MAIN_PORT,
                    path: message.data.url,
                    method: message.data.method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                    }
                };

                const req = http.request(options, (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk.toString();
                    });
                    res.on('end', () => {});
                });

                req.on('error', (error) => {
                    console.error(error);
                });

                message.data.data && req.write(message.data.data);
                req.end();
            });
        }
    } else {
        server.listen(MAIN_PORT, async () => {
            await writeFile('[]');
            console.log(`Server ${process.pid} listening on http://localhost:${MAIN_PORT}`);
        });
        server.on('request', async (req, res) => {
            launchRouter(req, res);
        });
        process.on('SIGINT', async () => {
            await writeFile('[]');
            process.exit();
        });
    }
} catch {
    writeFile('[]');
}

