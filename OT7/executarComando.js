const { exec, spawn } = require('child_process');

const listCommand = process.platform === 'win32' ? 'dir' : 'ls -la';

exec(listCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erro ao executar '${listCommand}': ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Erro de saída padrão (stderr) de '${listCommand}':\n${stderr}`);
    }
    console.log(`Saída padrão (stdout) de '${listCommand}':\n${stdout}`);
});