# Define a imagem base
FROM node:20-alpine3.18

# Define o diretório de trabalho dentro do container
WORKDIR /node-app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código fonte para o diretório de trabalho
COPY . .

# Expõe a porta em que o aplicativo estará rodando
EXPOSE 3005

# Comando para iniciar o aplicativo
CMD [ "npm", "run", "dev" ]
