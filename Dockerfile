FROM node:16.13.2

WORKDIR /usr/src/app/inputData
RUN mkdir /usr/src/frontend/

COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build

# Remove unused directories
RUN rm -rf /usr/src/app/inputData


RUN useradd --home-dir /home/admin --create-home --uid 5000 --gid 33 --shell /bin/sh admin

RUN chown -R admin /usr/src/app/outputData \
    && chown -R admin /usr/src/frontend

USER admin