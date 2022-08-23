FROM node:16 as build-image

# Install deps to build aws-lambda-ric
RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    libcurl4-openssl-dev

# Build ric
WORKDIR /var/task
COPY package.json .
COPY yarn.lock .
RUN yarn add aws-lambda-ric
RUN yarn

# Now build a clean image
FROM node:16

WORKDIR /var/task
COPY --from=build-image /var/task .
RUN npm i -g aws-cdk@2
COPY . .
RUN yarn tsc

# Use ric to start our lambda.
ENTRYPOINT ["/var/task/node_modules/.bin/aws-lambda-ric"]
CMD ["lib/parent-stack/lambda/deploy.handler"]