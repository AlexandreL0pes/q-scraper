FROM node:lts

WORKDIR /home/node/app

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN apt-get update \
  && apt-get install -y wget gnupg  libgtk-3-0 libnotify-dev  libgconf-2-4 libnss3 libxss1  libasound2 libxtst6 xauth xvfb libgbm-dev \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

COPY package*.json /home/node/app/

RUN yarn install --save

RUN yarn global add nodemon
RUN yarn add puppeteer

COPY . .

COPY --chown=node:node . .

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD yarn run dev