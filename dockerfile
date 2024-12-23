FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i -g @nestjs/cli

# COPY wait-for-it.sh /app/
# RUN chmod +x /app/wait-for-it.sh

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
