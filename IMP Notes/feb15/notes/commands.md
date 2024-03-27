# Docker

## images

```bash

# get the list of images
> docker image ls

# download an image from docker hub
> docker image pull <image name>
# > docker image pull hello-world

# get the metadata of selected image
> docker image inspect <image name>
# > docker image inspect hello-world

# remove a selected image
> docker image rm <image name>
# > docker image rm hello-world
```

```bash

# build an image
> docker image build -t <image name> .

```

## containers

```bash

# get the list of running containers
> docker container ls

# get a list of all containers
> docker container ls -a

# create a container
> docker container create <image name>
# > docker container create hello-world

# start the container
> docker container start <container name or id>

# stop the container
> docker container stop <container name or id>

# remove a stopped container
> docker container rm <container name or id>

# remove a running container
> docker container rm --force <container name or id>

# create and start the container
> docker container run <image name>

# run the container in detached mode
> docker container run -d <image name>

# run the container with a name
> docker container run -d --name <container name> <image name>

# run the container with interactive mode enabled
# -i: interactive mode
# -t: getting the teletype (terminal) from the container
> docker container run -d -i -t --name <container name> <image name>
> docker container run -itd --name <container name> <image name>

# run the container with environment variable
> docker container run -itd --name <container name> -e <variable name>=<value> <image name>

# get the logs of container
> docker container logs <container name or id>

# get metadata of a selected container
> docker container inspect <container name or id>

# execute a command inside a container
> docker container exec -it <container name or id> <command>

# execute date command inside a container named myhttpd
> docker container exec -it myhttpd date

# run a container with port forwarding enabled
> docker container run -itd --name myhttpd -p <source port>:<destination port> <image name>


# get the container's shell
> docker container exec -it <container name> <bash or sh>

```

## volumes
