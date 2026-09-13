# minisitee.com

Landing page estática do minisitee, com blog e páginas legais. HTML e
JavaScript puros, sem framework. O CSS é gerado pelo Tailwind e fica
commitado, então o servidor continua servindo só arquivos estáticos.

O aplicativo (painel, autenticação, assinatura em Next.js) fica em outro
repositório: `github.com/marceloneves/app.minisitee.com`, na pasta irmã
`../app.minisitee.com`. Não misture os dois.

## Registro de mudanças — obrigatório

Toda alteração feita neste projeto deve ser registrada em `log/`, um
arquivo por dia no formato `AAAA-MM-DD.md`.

Depois de qualquer mudança, acrescente uma entrada ao arquivo do dia
(crie o arquivo se ainda não existir), no fim, seguindo este formato:

```markdown
## HH:MM — Título curto da mudança

**O que mudou:** descrição em uma ou duas frases.

**Arquivos:** `arquivo-a.html`, `arquivo-b.css`

**Commit:** `abc1234`

**Motivo:** por que a mudança foi feita.
```

Regras:

- Entradas em ordem cronológica, da mais antiga para a mais recente,
  separadas por `---`.
- Registre também o que não gera commit — backups, testes, ajustes de
  configuração local, deploys. Nesses casos use `**Commit:** —`.
- Escreva o log em português, na mesma linguagem do resto do projeto.
- O log é parte do repositório e vai junto nos commits.

## Publicação

Publicar é só dar `git push` para o `main`. A VPS faz o deploy automático a
partir do GitHub — não existe script de deploy manual, FTP nem rsync neste
projeto, e não é preciso acessar o servidor.

## Convenções

- Mensagens de commit em português, no imperativo
  (*"Adiciona"*, *"Corrige"*, *"Remove"*).
- Textos do site em português do Brasil.
- Os arquivos `robots.txt` e `sitemap*.xml` usam URLs absolutas em
  `https://minisitee.com`. O `sitemap.xml` é só um índice: as páginas deste
  repositório ficam em `sitemap-paginas.xml` — é esse que você atualiza ao
  criar ou remover páginas — e os minisites em `sitemap-minisites.xml`, que o
  aplicativo gera a partir do banco. O servidor entrega o arquivo quando ele
  existe aqui e repassa o resto para o aplicativo, por isso os dois convivem
  no mesmo domínio.

## Visual e CSS

- Tailwind CSS v4, com componentes no padrão do shadcn/ui (`btn`, `card`,
  `badge`, `accordion`, `input`) e os tokens do shadcn (`background`,
  `foreground`, `muted`, `border`, `ring`...) em `src/site.css`. Fundo
  branco, visual inspirado no Linear.
- `src/site.css` é a fonte; `assets/site.css` é o arquivo gerado que vai
  para o ar. Depois de mudar classes em qualquer HTML ou em `src/site.css`,
  rode `npm run css` e commite `assets/site.css` junto — a VPS não roda
  build. Na primeira vez, `npm install`.
- Ao mudar o CSS, suba o `?v=` do `site.css` (e do `script.js`, se mudar)
  em todas as páginas.
- O cabeçalho e o rodapé são iguais em todas as páginas (`index.html`,
  `blog/`, `termos/`, `privacidade/`, `cookies/`): mudou em uma, replique
  nas outras.
- Todo link do site abre em nova aba (`target="_blank" rel="noopener"`),
  inclusive âncoras e `mailto:`. A única exceção é o link invisível
  "Pular para o conteúdo".
- Posts do blog ficam em `blog/<slug>/index.html`, listados em
  `blog/index.html` e no `sitemap-paginas.xml`.

## Rodando localmente

```bash
npm run css:watch        # regenera assets/site.css enquanto você edita
python3 -m http.server 8000
```
