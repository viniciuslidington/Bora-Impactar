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

# --- Nova Etapa 2: Serve os arquivos estáticos via Nginx (sem Node.js) ---
FROM nginx:alpine

# Copia os arquivos estáticos para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# (Opcional) Copia uma configuração customizada do Nginx (se necessário)
# COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 (Nginx já usa essa porta por padrão)
EXPOSE 80

# O Nginx inicia automaticamente, não precisa de CMD manual