FROM node:12 as builder
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM node:12
RUN yarn global add serve
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build /usr/src/app/build
EXPOSE 3000
CMD [ "serve", "-s", "build", "-l", "3000" ]
