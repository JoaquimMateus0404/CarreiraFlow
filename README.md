# CarreiraFlow / Gerador de Documentos (Currículo & Carta de Apresentação)

Projeto **Next.js + TypeScript**.

## Como está organizado

- `app/layout.tsx` — layout raiz (TypeScript): carrega Bootstrap, Font Awesome,
  Google Fonts e a lógica da aplicação.
- `app/page.tsx` — página principal (TypeScript): injeta a marcação da app.
- `content/app-body.html` — a marcação da aplicação (barra de ferramentas,
  editor de Currículo, editor de Carta de Apresentação, modais).
- `public/app.css` — todos os estilos da aplicação.
- `public/app.js` — toda a lógica (edição, modelos, temas, rascunhos,
  gravação automática, exportação em PDF). É JavaScript puro — ainda não foi
  reescrito em componentes React, de propósito (ver nota abaixo).


## Correr localmente

Precisa de ter o [Node.js](https://nodejs.org) instalado (versão 18 ou
superior).

```bash
npm install
npm run dev
```

Depois abra [http://localhost:3000](http://localhost:3000).


## Próximos passos sugeridos

- Testar localmente (`npm run dev`) e confirmar que tudo funciona igual ao
  ficheiro `.html` original.
- Se quiser, podemos ir convertendo secções de `public/app.js` em componentes
  React/TypeScript reais, uma de cada vez, testando a cada passo.
- Se no futuro quiser contas de utilizador ou sincronizar rascunhos entre
  dispositivos, o Next.js já suporta isso através de "API routes" — não é
  preciso adicionar Express.
