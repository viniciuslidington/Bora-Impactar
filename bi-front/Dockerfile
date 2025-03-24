# Etapa 1: Construção do frontend com Node.js
FROM node:20-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos essenciais
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm ci

# Copia o restante do código
COPY . .

# Gera os arquivos estáticos para produção
RUN npm run build

# Etapa 2: Servindo o frontend com Nginx
FROM nginx:1.25-alpine

# Copia os arquivos estáticos para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia um arquivo de configuração personalizado (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta do Nginx
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
