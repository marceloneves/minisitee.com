# minisitee.com

Landing page estática do minisitee. HTML, CSS e JavaScript puros — sem
build, sem dependências, sem framework.

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

## Convenções

- Mensagens de commit em português, no imperativo
  (*"Adiciona"*, *"Corrige"*, *"Remove"*).
- Textos do site em português do Brasil.
- Os arquivos `robots.txt` e `sitemap.xml` usam URLs absolutas em
  `https://minisitee.com` — atualize o `sitemap.xml` ao criar ou remover
  páginas.

## Rodando localmente

```bash
python3 -m http.server 8000
```
