const { Worker } = require('worker_threads');

const workerData = {
    start: 2,
    end: 10000000
}

const worker = new Worker('./worker_thread.js', { workerData });

worker.on('message', (result) => {
    console.log(`\n[Main] Resultado recebido do Worker: Encontrados ${result.count} números primos.`);
    console.log(`[Main] Tempo de execução no Worker: ${result.timeTaken}ms`);
});

worker.on('error', (err) => {
    console.error(`\n[Main] Erro no Worker Thread: ${err.message}`);
});

worker.on('exit', (code) => {
    if (code !== 0)
        console.error(`\n[Main] Worker Thread finalizado com código de saída ${code}.`);
    else
        console.log('\n[Main] Worker Thread finalizado com sucesso.');
});

let mainCounter = 0;
const intervalId = setInterval(() => {
    console.log(`[Main] Processo principal continua trabalhando... Contagem: ${mainCounter++}`);
    if (mainCounter >= 10) { 
        clearInterval(intervalId);
    }
}, 500);

console.log('[Main] Aguardando o Worker Thread concluir sua tarefa...');