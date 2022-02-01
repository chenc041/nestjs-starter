FROM node:17-alpine3.14

LABEL author='double_cl@163.com/chenc'

WORKDIR /root/work/server

RUN yarn global add pnpm && pnpm add pm2 -g

RUN pnpm config set registry https://registry.npmmirror.com/

COPY . /root/work/server/

RUN pnpm i && pnpm run build

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]
