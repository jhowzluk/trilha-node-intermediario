const chalk = require('chalk');

const mensagemErro = 'Erro: Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.';

console.error(chalk.red(mensagemErro));

const mensagemErroBold = 'ALERTA CRÍTICO: Dados corrompidos detectados!';
console.error(chalk.red.bold(mensagemErroBold));

const mensagemErroFundo = 'Falha na autenticação!';
console.error(chalk.white.bgRed(mensagemErroFundo));