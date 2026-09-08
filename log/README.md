# Log de mudanças

Registro de todas as alterações feitas no projeto, organizado por dia.

## Organização

Um arquivo por dia, nomeado no formato `AAAA-MM-DD.md`:

```
log/
├── README.md        ← este arquivo
├── 2026-09-08.md
├── 2026-09-09.md
└── ...
```

## Formato de cada entrada

```markdown
## HH:MM — Título curto da mudança

**O que mudou:** descrição em uma ou duas frases.

**Arquivos:** `arquivo-a.html`, `arquivo-b.css`

**Commit:** `abc1234`

**Motivo:** por que a mudança foi feita (opcional).
```

Entradas ficam em ordem cronológica, da mais antiga para a mais recente.
Mudanças sem commit (testes, backups, configurações locais) também entram,
com `**Commit:** —`.
