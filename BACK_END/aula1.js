const parte1 = "Node";
const parte2 = ".js";
// Guardamos o resultado da junção em uma terceira variável antes de imprimir
const resultado = parte1 + parte2;
console.log(resultado);
// 'new Date()' é um comando interno do JavaScript que captura o momento atual do sistema
console.log("Data atual: " + new Date());
// A função console.log exibe mensagens no terminal/saída do sistema
console.log("Olá! O Node está a funcionar.");
// O Node processa operações matemáticas automaticamente dentro do console.log
console.log(10 + 25);
// setTimeout executa uma função depois de um tempo (em milissegundos: 3000ms = 3s)
setTimeout(() => {
    console.log("Passaram 3 segundos!");
}, 3000);
// 'const' cria uma variável cujo valor não muda (constante)
const nome = "George"; 
// O símbolo '+' aqui serve para juntar (concatenar) o texto com a variável
console.log("Bem-vindo, " + nome);
// 'process' é um objeto global do Node que contém informações sobre o programa em execução
console.log("Você está usando a versão: " + process.version);
