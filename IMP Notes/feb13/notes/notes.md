# docker swarm

## swarm

```bash

# get the status of swarm
> docker info

# initialize a swarm (cluster)
> docker swarm init

# stop the swarm
> docker swarm leave --force

# generate a token for worker node
> docker swarm join-token worker


```

## node

```bash

# get the list of nodes
> docker node ls

# get the information about selected node
> docker node inspect <node id>

# remove a node from swarm
> docker node rm <node id>


```

## service

```bash

# get the list of services
> docker service ls

# create a service
> docker service create --name <service name> <image name>
# > docker service create --name myservice httpd

# create a service and expose a port (enable port forwarding)
> docker service create --name <service name> -p <source port>:<dest port> <image name>
# > docker service create --name myservice -p 8082:80 httpd

# create a service with desired count
> docker service create --name <service name> -p <source>:<destination> --replicas <desired count> <image name>
# > docker service create --name nginx-service -p 8083:80 --replicas 5 nginx

# get the containers created by the service
> docker service ps <service name>
# > docker service ps myservice

# remove a service
> docker service rm <service name>
# > docker service rm myservice

# scale the service
> docker service scale <service name>=<desired count>
# > docker service scale myservice=10

```
