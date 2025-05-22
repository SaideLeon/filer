# Filer - Gerador de Fichas de Leitura

Este projeto é uma aplicação web que automatiza a busca, raspagem e geração de fichas de leitura acadêmica a partir de artigos do site [Toda Matéria](https://www.todamateria.com.br/), utilizando inteligência artificial para resumir conteúdos.

## Funcionalidades

- Busca artigos por termo no Toda Matéria
- Raspagem automática de conteúdo, imagens e citações dos artigos
- Geração de fichas de leitura com resumo automático via IA (Groq API)
- Interface moderna com feedback de progresso e logs
- Visualização das fichas geradas

## Estrutura do Projeto

- `src/components/fichador.tsx`: Componente principal da interface de geração de fichas
- `src/components/FichaList.tsx`: Exibe uma lista de fichas de leitura
- `src/tools/ai/fichaAgent.ts`: Integração com IA para geração de resumos e montagem da ficha
- `src/app/api/filer/route.ts`: API route para busca e raspagem de artigos
- `src/utils/raspagem.ts`: Funções de raspagem de dados do Toda Matéria

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/filer.git
   cd filer
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz com sua chave da API Groq:
     ```
     GROQ_API_KEY=sua_chave_groq_aqui
     ```

4. Rode o projeto em modo desenvolvimento:
   ```sh
   npm run dev
   ```

5. Acesse em [http://localhost:3000](http://localhost:3000)

## Como funciona

1. Digite um termo de busca e clique em "Iniciar Fichamento".
2. O sistema busca artigos relacionados, raspa o conteúdo e envia para a IA gerar um resumo.
3. As fichas geradas são exibidas na tela, incluindo título, autor, resumo, imagens e citação.

## Tecnologias

- Next.js (App Router)
- React
- Tailwind CSS
- Cheerio (raspagem)
- Axios (requisições HTTP# Filer - Gerador de Fichas de Leitura

Este projeto é uma aplicação web que automatiza a busca, raspagem e geração de fichas de leitura acadêmica a partir de artigos do site [Toda Matéria](https://www.todamateria.com.br/), utilizando inteligência artificial para resumir conteúdos.

## Funcionalidades

- Busca artigos por termo no Toda Matéria
- Raspagem automática de conteúdo, imagens e citações dos artigos
- Geração de fichas de leitura com resumo automático via IA (Groq API)
- Interface moderna com feedback de progresso e logs
- Visualização das fichas geradas

## Estrutura do Projeto

- `src/components/fichador.tsx`: Componente principal da interface de geração de fichas
- `src/components/FichaList.tsx`: Exibe uma lista de fichas de leitura
- `src/tools/ai/fichaAgent.ts`: Integração com IA para geração de resumos e montagem da ficha
- `src/app/api/filer/route.ts`: API route para busca e raspagem de artigos
- `src/utils/raspagem.ts`: Funções de raspagem de dados do Toda Matéria

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/filer.git
   cd filer
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz com sua chave da API Groq:
     ```
     GROQ_API_KEY=sua_chave_groq_aqui
     ```

4. Rode o projeto em modo desenvolvimento:
   ```sh
   npm run dev
   ```

5. Acesse em [http://localhost:3000](http://localhost:3000)

## Como funciona

1. Digite um termo de busca e clique em "Iniciar Fichamento".
2. O sistema busca artigos relacionados, raspa o conteúdo e envia para a IA gerar um resumo.
3. As fichas geradas são exibidas na tela, incluindo título, autor, resumo, imagens e citação.

## Tecnologias

- Next.js (App Router)
- React
- Tailwind CSS
- Cheerio (raspagem)
- Axios (requisições HTTP