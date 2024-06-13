# Define a imagem base como node:20-alpine3.18
FROM node:20-alpine3.18

# Define o diretório de trabalho dentro do contêiner como /node-app
WORKDIR /node-app

# Define variáveis de ambiente para o ambiente Node.js
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Define a porta em que o aplicativo será executado e a expõe
ARG PORT=3040
ENV PORT=${PORT}
EXPOSE ${PORT}

# Copia os arquivos package.json e package-lock.json para dentro do contêiner
COPY package.json package-lock.json ./

# Instala as dependências do projeto usando 'npm ci' para garantir a reprodução exata das dependências
RUN npm ci

# Copia todo o resto do projeto para dentro do contêiner
COPY . .

# Define o comando padrão para iniciar o aplicativo Node.js 
ENTRYPOINT ["node","server.js"]


