
const { parentPort, workerData, isMainThread } = require('worker_threads');

const workerId = process.pid || Math.floor(Math.random() * 10000); 

if (isMainThread) {
    console.error('Este script deve ser executado como um Worker Thread!');
    process.exit(1);
}


function performHeavyTask(iterations) {
    let sum = 0;
    for (let i = 0; i < iterations; i++) {
        sum += i;

        if (i % (iterations / 10) === 0 && i !== 0) { // A cada 10%
            const progress = ((i / iterations) * 100).toFixed(0);
            parentPort.postMessage({ type: 'progress', workerId: workerId, data: progress });
        }
    }
    return sum;
}

const totalIterations = 1000000000;


parentPort.postMessage({ type: 'log', level: 'info', workerId: workerId, data: 'Iniciando tarefa pesada...' });

const startTime = Date.now();
const result = performHeavyTask(totalIterations);
const endTime = Date.now();

parentPort.postMessage({ type: 'result', workerId: workerId, data: result });
parentPort.postMessage({ type: 'log', level: 'info', workerId: workerId, data: `Tarefa pesada concluída em ${(endTime - startTime) / 1000} segundos.` });
