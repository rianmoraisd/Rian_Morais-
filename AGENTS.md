# Notas de ambiente (Base44)

## O que é este repositório
Site estático (HTML + CSS + JS puro), sem build, sem bundler e sem dependências de npm.
Todo o conteúdo público está na raiz do repositório (`*.html`, `style.css`, `script.js`, `jogo.css`, `jogo.js`).
A pasta `BACK_END/` e os arquivos `.md` são material de estudo e não fazem parte do site.

## Como roda
`docker compose -f docker-compose.base44.yml up -d` sobe um nginx servindo a raiz do
repositório (bind mount somente leitura) em `http://localhost:3000`.

- Não há servidor de desenvolvimento com hot reload: uma edição em `.html/.css/.js`
  aparece no próximo carregamento. Use `reload_preview` depois de editar.
- `nginx.base44.main.conf` roda o worker como `root` de propósito: o diretório do
  repositório no sandbox não é atravessável pelo usuário `nginx`, e sem isso todo
  arquivo retorna 404 (erro `stat() ... Permission denied` no log do container).
- `nginx.base44.conf` bloqueia dotfiles, `BACK_END/` e arquivos `.md` para que o
  material interno não seja servido pelo navegador.
- Nenhum segredo/env é necessário.

## Páginas
`index.html`, `servicos.html`, `como-funciona.html`, `planos.html`, `demonstracao.html`,
`login.html`, `cadastro.html`, `painel.html` e `jogo.html` (jogo da memória, ligado no
menu das páginas do site).

## Como verificar
- `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/jogo.html` deve dar 200.
- Jogo: abrir `/jogo.html`, conferir 12 cartas no nível Fácil, 16 no Médio e 20 no Difícil;
  acertar um par soma 100 pontos, errar tira 10 (mínimo 0); ao completar todos os pares o
  recorde do nível é salvo em `localStorage` na chave `atendeai_memoria_recordes`.

## Testes
Não existem testes automatizados neste projeto.

## Observações
- Os arquivos `.html` usam quebras de linha CRLF; editores que reescrevem o arquivo
  inteiro devem preservá-las para não gerar diff gigante.
- O menu principal fica oculto em telas menores que 900px (regra existente em `style.css`).
