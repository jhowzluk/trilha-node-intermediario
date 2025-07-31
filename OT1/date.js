const dataAtual = new Date();

console.log("--- Data e Hora Atuais (Nativo) ---");

console.log("Formato padrão:", dataAtual.toString());

console.log("Data local:", dataAtual.toLocaleDateString());

console.log("Hora local:", dataAtual.toLocaleTimeString());

console.log("Data e Hora local:", dataAtual.toLocaleString());

const ano = dataAtual.getFullYear();
const mes = dataAtual.getMonth() + 1; 
const dia = dataAtual.getDate();
const horas = dataAtual.getHours();
const minutos = dataAtual.getMinutes();
const segundos = dataAtual.getSeconds();