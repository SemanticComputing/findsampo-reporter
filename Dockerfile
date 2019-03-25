FROM node:10.15.3-alpine

# Create app directory
RUN mkdir /opt/app && chown node:node /opt/app

RUN apk add --update git && \
rm -rf /tmp/* /var/cache/apk/*

WORKDIR /opt/app

USER node

# Yarn and webpack configs
COPY package.json ./
COPY yarn.lock ./
COPY webpack.config.js ./

# Babel 7 presets and plugins
COPY .babelrc ./

# ESLint configuration
COPY .eslintrc.js ./

# App source
COPY public ./public
COPY client ./client
COPY server ./server

# Run the scripts defined in package.json
RUN yarn && yarn build:prod

EXPOSE 3001

# Express server handles the backend functionality and also serves the React app
CMD ["node", "./server/server.js"]
