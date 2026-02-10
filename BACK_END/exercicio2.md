1. O que é o Node.js?

O Node.js é um ambiente de execução (runtime) que permite rodar JavaScript fora do navegador, geralmente no servidor.
Ele não é uma linguagem de programação porque não cria uma nova sintaxe ou regras — ele apenas executa JavaScript, usando recursos do sistema operacional (arquivos, rede, processos etc.).

2. Diferenças entre Node.js e JavaScript no navegador

Duas diferenças importantes:

Ambiente

Navegador: JavaScript interage com HTML, CSS e o DOM.

Node.js: JavaScript interage com o sistema (arquivos, rede, banco de dados).

APIs disponíveis

Navegador: APIs como document, window, alert.

Node.js: APIs como fs, http, path, process.

3. O que é o V8 Engine e sua importância

O V8 Engine é o motor de execução JavaScript criado pelo Google (usado no Chrome).
Sua importância para o Node.js é enorme, porque:

Ele compila JavaScript em código de máquina

Torna a execução muito rápida

É o “coração” que permite ao Node.js rodar JS com alto desempenho

4. I/O não bloqueante no Node.js

I/O não bloqueante significa que operações demoradas (como leitura de arquivos ou requisições HTTP) não travam a execução do programa.

Em vez de esperar a operação terminar, o Node.js:

Inicia a tarefa

Continua executando outras partes do código

Processa o resultado quando a tarefa termina

5. O que é o Event Loop

O Event Loop é o mecanismo que gerencia a execução de código assíncrono no Node.js.

Funcionamento resumido:

O código principal é executado

Operações assíncronas são enviadas para o background

Quando finalizam, suas callbacks/promises entram em filas

O Event Loop verifica essas filas e executa as funções quando possível

6. O que são módulos no Node.js

Módulos são arquivos ou pacotes que encapsulam funcionalidades reutilizáveis.

Tipos:

Módulos internos

Já vêm com o Node.js

Ex: fs, http, path, os

Módulos externos

Criados por terceiros

Instalados via npm

Ex: express, lodash, mongoose

Módulos do desenvolvedor

Criados pelo próprio programador

Ex: arquivos .js do projeto usando module.exports ou export

7. Para que serve o package.json

O package.json é o arquivo de configuração do projeto Node.js.

Ele pode conter, por exemplo:

Nome e versão do projeto

Dependências e dependências de desenvolvimento

Scripts (start, dev, test)

Autor e licença

8. O que é o npm

O npm (Node Package Manager) é o gerenciador de pacotes do Node.js.

Funções principais:

Instalar bibliotecas

Atualizar dependências

Gerenciar versões

Executar scripts do projeto
