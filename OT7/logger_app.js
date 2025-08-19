const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file'); 


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
        filename: 'application-%DATE%.log', // Nome do arquivo de log, com %DATE% para rotação diária
        datePattern: 'YYYY-MM-DD',           // Padrão da data para o nome do arquivo
        zippedArchive: true,                 // Compacta arquivos de log antigos (.gz)
        maxSize: '20m',                      // Tamanho máximo do arquivo de log antes de rotacionar (20MB)
        maxFiles: '14d',                     // Retém arquivos de log por 14 dias
        dirname: 'logs',                     // Onde os arquivos de log serão salvos (cria a pasta 'logs')
        format: logFormat                    // Usa o formato definido acima
    }),

];

const logger = winston.createLogger({
    level: 'info',
    transports: transports
});


logger.debug('Esta é uma mensagem de debug. Não aparecerá com nível "info".'); 
logger.info('Esta é uma mensagem informativa.');
logger.warn('Esta é uma mensagem de aviso.');
logger.error('Esta é uma mensagem de erro.');
logger.error('Outro erro: Falha ao conectar ao banco de dados.', { database: 'mydb', user: 'admin' });


let counter = 0;
setInterval(() => {
    logger.info(`Aplicação em execução. Contador: ${counter++}`);
    if (counter % 5 === 0) {
        logger.warn(`Aviso: Contador atingiu ${counter}.`);
    }
    if (counter % 10 === 0) {
        logger.error(`Erro crítico simulado: Contador atingiu ${counter}.`);
    }
}, 2000);

console.log('\n--- Logger Winston configurado e gerando logs. Verifique o console e a pasta "logs"! ---');