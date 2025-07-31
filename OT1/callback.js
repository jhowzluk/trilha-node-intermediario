/**
 * @param {number} num1 
 * @param {number} num2
 * @param {function(Error|null, number|null): void} callback
*/

function somarComCallback(num1, num2, callback) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return callback(new Error('Ambos os argumentos devem ser números.'), null);
  }

  const resultado = num1 + num2;

  callback(null, resultado);
}

somarComCallback(5, 3, (erro, soma) => {
  if (erro) {
    console.error('Ocorreu um erro na soma:', erro.message);
  } else {
    console.log('Exemplo 1 (Sucesso): A soma é', soma); 
  }
});

somarComCallback(10.5, 2.3, (erro, soma) => {
  if (erro) {
    console.error('Ocorreu um erro na soma:', erro.message);
  } else {
    console.log('Exemplo 2 (Sucesso): A soma é', soma); 
  }
});

somarComCallback('cinco', 7, (erro, soma) => {
  if (erro) {
    console.error('Exemplo 3 (Erro):', erro.message);
  } else {
    console.log('Exemplo 3 (Sucesso): A soma é', soma);
  }
});

somarComCallback(4, null, (erro, soma) => {
  if (erro) {
    console.error('Exemplo 4 (Erro):', erro.message);
  } else {
    console.log('Exemplo 4 (Sucesso): A soma é', soma);
  }
});