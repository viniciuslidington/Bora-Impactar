# Etapa 1: Construção do frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos essenciais para instalar as dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm ci

# Copia o restante do código para o container
COPY . .

# Gera os arquivos estáticos para produção
RUN npm run build

# Etapa 2: Servindo o frontend com Node.js
FROM node:20-alpine

WORKDIR /app

# Instala apenas as dependências necessárias para rodar o servidor
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copia os arquivos estáticos gerados na etapa de build
COPY --from=builder /app/dist ./dist 

# Copia o servidor customizado
COPY server.js ./server.js

# Expõe a porta padrão do servidor
EXPOSE 8080

# Inicia o servidor customizado
CMD ["node", "server.js"]

