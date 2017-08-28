FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app/cms
WORKDIR /usr/src/app/cms

# Install app dependencies
COPY package.json /usr/src/app/cms
RUN npm install

# Bundle app source
COPY . /usr/src/app/cms
EXPOSE 8080

CMD [ "npm", "start" ]