FROM node:20
WORKDIR /app
COPY . .
RUN npm install && npm rebuild sqlite3
EXPOSE 5001
CMD ["npm", "start"]