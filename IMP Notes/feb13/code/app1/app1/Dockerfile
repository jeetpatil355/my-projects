# base image
FROM node

# set working directory
WORKDIR /src

# copy app code to image
# param1: all the file(s) in the current directory (host machine)
# param2: working directory (of image)
COPY . .

# install all dependencies
# will get executed at the time of building an image
RUN npm install

# expose port 3000
EXPOSE 3000

# start the react application
# will get executed at the time of starting a container
CMD npm run start