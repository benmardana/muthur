FROM node:14.17.3-buster-slim

WORKDIR /muthur

COPY . .
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "muthur"]
