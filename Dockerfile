# Pull base image.
FROM ubuntu:14.04

# Install Node.js
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

# Install PM2
RUN npm install -g pm2

ENV NODE_ENV development

ADD start.sh /start.sh
RUN chmod 755 /start.sh

# COPY . /backend
# COPY package.json /express-app/

# Define working directory
WORKDIR /express-app

# Define mountable directories.
VOLUME ["/express-app"]

# RUN npm install

# Binds to port 8080
EXPOSE 8080

# ENTRYPOINT
CMD ["/start.sh"]
