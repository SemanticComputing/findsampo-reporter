# https://github.com/nodejs/docker-node/blob/170ed2092d4925971f9cd3ad5dfc416e820f90fd/10/alpine/Dockerfile
FROM node:10.15.3-alpine

# Create app directory
RUN mkdir /opt/app && chown node:node /opt/app

RUN apk add --update git && \
rm -rf /tmp/* /var/cache/apk/*

WORKDIR /opt/app

# Public files
COPY public ./public
RUN chown -R node:node ./public

USER node

# Yarn and webpack configs
COPY package.json ./
COPY yarn.lock ./
COPY webpack.config.js ./

# Babel 7 presets and plugins
COPY .babelrc ./

# ESLint configuration
COPY .eslintrc.js ./

# Env variables
COPY .env.development ./

# Client and server files
COPY client ./client
COPY server ./server

# Run the scripts defined in package.json
RUN yarn && yarn build:prod

EXPOSE 3001

# Express server handles the backend functionality and also serves the React app
CMD ["node", "./server/server.js"]
