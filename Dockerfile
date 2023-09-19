FROM node:18-alpine3.14

LABEL author='double_cl@163.com/chenc'

WORKDIR /root/work/server

ENV NODE_ENV production

ENV PNPM_HOME="/root/.local/share/pnpm"

ENV PATH="${PATH}:${PNPM_HOME}"

RUN yarn global add pnpm && pnpm add pm2 @nestjs/cli -g

RUN pnpm config set registry https://registry.npmmirror.com/

COPY . /root/work/server/

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN pnpm i && pnpm run build

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]
