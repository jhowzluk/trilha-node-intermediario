
const { Worker } = require('worker_threads');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
        info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
    )
);

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            logFormat
        )
    }),
    new DailyRotateFile({
        filename: 'worker-tasks-%DATE%.log', // Logs das tarefas dos workers
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '7d',
        dirname: 'logs', // Salva na pasta 'logs'
        format: logFormat
    }),
    new DailyRotateFile({
        level: 'error', // Erros do main thread e dos workers (se passados)
        filename: 'worker-errors-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '5m',
        maxFiles: '7d',
        dirname: 'logs',
        format: logFormat
    })
];

const logger = winston.createLogger({
    level: 'info',
    transports: transports
});

console.log('--- Aplicação Principal Iniciada ---');
logger.info('Iniciando o processo principal da aplicação.');


const worker = new Worker(path.resolve(__dirname, 'worker.js')); // Caminho para o script do worker


worker.on('message', (message) => {
    if (message.type === 'progress') {
        logger.info(`[Worker ${message.workerId}] Progresso da tarefa: ${message.data}%`);
    } else if (message.type === 'result') {
        logger.info(`[Worker ${message.workerId}] Tarefa concluída. Resultado final: ${message.data}`);
    } else if (message.type === 'log') {
    
        logger.log(message.level, `[Worker ${message.workerId}] ${message.data}`);
    }
});

worker.on('error', (err) => {
    logger.error(`Erro no Worker Thread: ${err.message}`);
});

worker.on('exit', (code) => {
    if (code !== 0) {
        logger.error(`Worker Thread finalizou com código de saída não-zero: ${code}`);
    } else {
        logger.info('Worker Thread finalizado com sucesso.');
    }
});

logger.info('Worker Thread iniciado. Aguardando mensagens de progresso...');

setInterval(() => {
    logger.info('Processo principal está ativo e não bloqueado.');
}, 5000);