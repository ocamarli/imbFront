# Usa una imagen base de Node.js
FROM node:16

# Configura el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y yarn.lock
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./public ./public
COPY ./src ./src

# Instala las dependencias

RUN yarn install
RUN yarn build


# Expone el puerto en el que la aplicación estará corriendo
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["yarn", "start"]