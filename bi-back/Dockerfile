# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package*.json ./

RUN npm install

# Copia o restante do código
COPY . .

RUN npx prisma generate

# Expõe as portas que as APIs usam
EXPOSE 3000 3001 3002 3100

# Comando para rodar o Node.js (substitua pelo script correto)
CMD ["node", "server.js"]
