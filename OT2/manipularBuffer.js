const { buffer } = require("stream/consumers");

const myString = 'Olá, node.js e buffers!'

console.log(`String original: ${myString}`)
console.log(`Tamanho da string original (número de caracteres): ${myString.length}`);

const stringBuffer = Buffer.from(myString);
console.log(stringBuffer);

const stringDoBuffer = stringBuffer.toString('utf8');
console.log(stringDoBuffer);
