# Escolha uma imagem base oficial do Node como ponto de partida
FROM node:latest

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos e pastas restantes para o diretório de trabalho
COPY . .

# Construa a aplicação para produção
RUN npm run build

# Escolha uma imagem base do nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos estáticos gerados pelo comando de construção para o diretório do nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Exponha a porta 80 para permitir o acesso ao contêiner
EXPOSE 80

# Inicie o nginx e mantenha o processo em execução
CMD ["nginx", "-g", "daemon off;"]
