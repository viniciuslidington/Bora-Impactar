# Etapa 1: Construção do frontend (mantida)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos essenciais para instalar as dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm ci

# Copia o restante do código para o container
COPY . .

# Gera os arquivos em /app/dist
RUN npm run build  

# Etapa 2: Imagem de produção do frontend
FROM nginx:alpine

# Copia o build do React para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
