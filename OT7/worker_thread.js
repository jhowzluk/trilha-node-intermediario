const { parentPort, workerData } = require('worker_threads');

console.log(`[Worker ${process.pid}] Worker Thread iniciado. Recebeu dados:`, workerData);

function findPrimes(start, end) {
    const primes = [];
    const startTime = Date.now();

    for (let i = start; i <= end; i++) {
        let isPrime = true;
        if (i < 2) {
            isPrime = false;
        } else {

            for (let j = 2; j <= Math.sqrt(i); j++) {
                if (i % j === 0) {
                    isPrime = false;
                    break;
                }
            }
        }
        if (isPrime) {
            primes.push(i);
        }
    }

    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    return {
        count: primes.length,
        primes: primes, 
        timeTaken: timeTaken
    };
}

const result = findPrimes(workerData.start, workerData.end);

parentPort.postMessage(result);

console.log(`[Worker ${process.pid}] Tarefa de encontrar primos concluída.`);