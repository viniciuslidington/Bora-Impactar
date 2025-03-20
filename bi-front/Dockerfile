# Etapa de build (criação dos arquivos estáticos)
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa final (imagem do Nginx para servir os arquivos estáticos)
FROM nginx:alpine

# Copia os arquivos gerados na fase de build para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
