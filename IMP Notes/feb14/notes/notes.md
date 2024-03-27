# Kubernetes

## minikube

```bash

# start the minikube cluster
> minikube start

# stop the cluster
> minikube stop

# destroy the cluster
> minikube destroy

# expose a service for outside access
> minikube service <service name>

```

## namespace

```bash

# get the list of all namespaces
> kubectl get namespaces
> kubectl get ns

# create a new namespace
> kubectl create namespace <namespace name>
# > kubectl create namespace mynamespace

# delete a namespace
# - k8s will also delete all the members of the namespace
> kubectl delete namespace <namespace name>
# > kubectl delete namespace mynamespace

# connect to the minikube cluster
> minikube ssh

```

## Pods

```bash

# get the list of pods
> kubectl get pods

# get the list of pods from specified namespace
> kubectl get pods -n <namespace name>

# get the list of pods with some properties
> kubectl get pods -o wide

# create a pod
> kubectl create -f <file name>

# create a pod in specified namespace
> kubectl create -f <file name> -n <namespace>

# get pod details
> kubectl describe pod <pod name>
# > kubectl describe pod pod1

# delete a pod
> kubectl delete pod <pod name>
# > kubectl delete pod pod1

```

## Replica Set

```bash

# get the list of replica sets
> kubectl get replicasets
> kubectl get rs

# create a new replica set
> kubectl create -f <file name>

# delete a replica set
> kubectl delete rs <rs name>
# > kubectl delete rs rs1

# apply the new configuration
> kubectl apply -f <file name>

```

## service

```bash

# get list of services
> kubectl get service
> kubectl get services
> kubectl get svc

# get service's details
> kubectl describe service <service name>
# > kubectl describe service service1

# delete a service
> kubectl delete service <service name>

```

## volume

```bash

# get the list of volumes
> docker volume ls

# create a new volume
> docker volume create <volume name>
# > docker volume create my-volume

# get details of selected volume
> docker volume inspect <volume name>
# > docker volume inspect my-volume

# prune (remove the unwanted) the volumes
> docker volume prune

```
