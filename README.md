# 🔥 Pokémon App

Uma Single Page Application (SPA) para listagem e visualização de detalhes de Pokémons utilizando a PokéAPI.

## 🚀 Funcionalidades

- **Listagem de Pokémons**: Exibe 10 pokémons iniciais com imagem e nome
- **Carregamento incremental**: Botão "Carregar mais" para buscar mais 10 pokémons
- **Detalhes do Pokémon**: Página com informações completas (movimentos, habilidades, tipos)
- **Alternador de tema**: Botão para alternar entre tema claro e escuro
- **Navegação**: Sistema de rotas para navegação entre páginas

## 🛠️ Tecnologias Utilizadas

- **React.js** - Biblioteca principal para construção da interface
- **Context API** - Gerenciamento de estado do tema (claro/escuro)
- **styled-components** - Estilização dos componentes
- **react-router-dom** - Navegação entre páginas
- **PokéAPI** - API para dados dos pokémons

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pokemon-app.git

# Navegue até o diretório
cd pokemon-app

# Instale as dependências
npm install

# Execute o projeto
npm start
```

## 🎯 Estrutura

### Página Inicial (Home)
- Lista de pokémons com imagem e nome
- Botão "Carregar mais" para paginação
- Cada pokémon é clicável para acessar os detalhes

### Página de Detalhes
- Imagem do pokémon
- Nome
- Lista de movimentos
- Lista de habilidades com descrições
- Tipos do pokémon

## 🎨 Temas

A aplicação possui dois temas:
- **Claro**: Fundo branco com texto escuro
- **Escuro**: Fundo escuro com texto claro

O tema é alternado através do botão no cabeçalho da aplicação.

## 📱 Responsividade

Interface responsiva que se adapta a diferentes tamanhos de tela.

## 🔗 API

Utiliza a [PokéAPI](https://pokeapi.co/) para buscar dados dos pokémons.

---

Desenvolvido por Robert Castro com ❤️ usando React.js
