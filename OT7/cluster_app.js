const cluster = require('cluster');
const http = require('http');    
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`[Master ${process.pid}] Processo mestre rodando.`);
    console.log(`[Master ${process.pid}] Detectados ${numCPUs} núcleos de CPU. Criando ${numCPUs} processos workers...`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`[Master ${process.pid}] Worker ${worker.process.pid} morreu com código ${code} e sinal ${signal}. Reiniciando...`);
        cluster.fork();
    });

    let masterHeartbeat = 0;
    setInterval(() => {
        console.log(`[Master ${process.pid}] Mestre ainda vivo, contagem: ${masterHeartbeat++}`);
    }, 5000); // A cada 5 segundos

}else { 
    http.createServer((req, res) => {
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Olá do Worker ${process.pid}!`);
    }).listen(8000, () => {
        console.log(`[Worker ${process.pid}] Processo worker iniciado e ouvindo na porta 8000.`);
    });

    console.log(`[Worker ${process.pid}] Worker está pronto para lidar com requisições.`);
}

