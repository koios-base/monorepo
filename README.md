# Monorepo

## Overview

This holds all of the services, cron, and async systems that make up Koios

## Scripts

```sh
# YOU MUST DO THIS BEFORE ANYTHING ELSE
# AND YOU MUST DO IT IN EACH TERMINAL YOU
# WANT TO RUN IT IN
eval $(minikube -p minikube docker-env)

# Build, Tag, and Update Minikube
./scripts/update-local

# Builds all folders inside of cronjobs
./scripts/build-cronjobs

# Builds all folders inside of services
./scripts/build-services

# Builds everything locally for docker
./scripts/build-all
```

## Interfaces

> This is assuming you have set up /etc/hosts to point
> at the correct ingress urls
> 
> ex:
>
> 192.168.49.2 weather.local-demo

_**services/weather**_: http://weather.local-demo