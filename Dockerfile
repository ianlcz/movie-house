# pull official base image
FROM node:lts-alpine

# set working directory
WORKDIR /movie-house

# add `/app/node_modules/.bin` to $PATH
ENV PATH /movie-house/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts -g --silent

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]