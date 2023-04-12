#
# for local development only
#

FROM node:14-alpine3.16

RUN mkdir -p /be

VOLUME ["/be"]
WORKDIR /be

# Bundle app source
COPY . /be

# Install all dependencies
RUN npm i

EXPOSE 3000
CMD [ "npm", "start" ]

