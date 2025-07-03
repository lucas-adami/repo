# Stage 1: Build da aplicação React usando Node.js
FROM node:18-alpine AS build

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install --force

# Copia o restante dos arquivos da aplicação
COPY . .

# Passa o argumento da URL da API para o build
ARG VITE_EC2_API_URL

# Exporta como variável de ambiente para o Vite captar no build
ENV VITE_EC2_API_URL=${VITE_EC2_API_URL}

# Executa o build da aplicação React (Vite)
RUN npm run build

# Stage 2: Serve a aplicação estática usando Nginx
FROM nginx:stable-alpine

# Copia os arquivos gerados pela build para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
