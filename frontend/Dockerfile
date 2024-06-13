FROM node:alpine

WORKDIR /node-app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

EXPOSE 3000

COPY . .

# Run dev
RUN npm install
CMD [ "npm", "run", "dev" ]
