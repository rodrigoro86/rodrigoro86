# Portfólio Pessoal (Template)

Um site de portfólio estático, simples e moderno, com tema claro/escuro e conteúdo em `data/profile.json`.

## Como usar

1. Edite o arquivo `data/profile.json` com suas informações: nome, bio, habilidades, experiência, projetos e contatos.
2. Abra `index.html` no navegador (duplo clique) ou sirva localmente com um servidor estático.

### Servir localmente (opcional)

- Usando Python 3:

```bash
python3 -m http.server 5173
```

Acesse `http://localhost:5173`.

- Usando Node (se tiver instalado):

```bash
npx serve -s . -l 5173
```

## Personalização rápida

- Título e nome exibidos são carregados do `data/profile.json`.
- Para alterar o esquema de cores, ajuste variáveis CSS em `styles.css` (seções `:root` e `.theme-dark`).
- Para adicionar/remover seções, edite `index.html` e os renderizadores correspondentes em `script.js`.

## Estrutura

```
index.html        # Estrutura do site e seções
styles.css        # Estilos, responsividade e tema
script.js         # Carrega profile.json e popula a página
data/profile.json # Seus dados de perfil (edite aqui)
```

## Deploy

- GitHub Pages: publique este repositório e habilite Pages (branch `main`/`docs`).
- Netlify/Vercel: importe o repositório e defina diretório base como a raiz.

## Licença

Uso livre. Sem garantias. Personalize como desejar.
