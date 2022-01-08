# Monorepo

## Overview

This holds all of the services, cron, and async systems that make up Koios


## Todo Before Production

- Change _**EVERY**_ secret
- Change ingress.yaml hostnames
- Ensure that Ingress Controller/Load Balancer is set up in cloud


## Setting Up From Scratch

```sh
git clone <repo link>
cd koios
minikube start
./scripts/update-local

# Edit /etc/hosts
<minikube ip> weather.local-demo
```

## Services

_**Services**_ are things that we can interact with from the outside world.
Koios is made up of Services. Each Service will expose an HTTP Server interface.
Each Service will expose a [Twirp](https://github.com/twitchtv/twirp) via
[twirp-ts](https://github.com/hopin-team/twirp-ts).

At some point, the definitions that power the Services should be colocated and
the Services should import them:

```ts
import Stuff from '@shared/lib'
```

We could do this at build time via some copying of the folders and using a
common tsconfig-paths/tsconfig.paths setup. For now, we are going to copy-paste
the needful until we get tired of it.

The services that we currently support:
### Weather

The **Weather** service is responsible for keeping track of the weather throughout
the day and recording it. It is also responsible for answering queries about the
current weather and some queries about historical weather.

## K9s Dashboard

![](https://imgur.com/n6vJZW7.png)

## Development Flow

```sh
# YOU MUST DO THIS BEFORE ANYTHING ELSE
# AND YOU MUST DO IT IN EACH TERMINAL YOU
# WANT TO RUN IT IN
eval $(minikube -p minikube docker-env)

./scripts/update-local

# ... Make Changes ...
./scripts/update-local

# Then, inside of k9s, kill the thing you want to restart
```

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

You can import the working Insomnia collection to make HTTP requests

_**services/weather**_: http://weather.local-demo

### Mongo Admin

You will need to use k9s and `port forward` the `mongo-admin` in order to access it. It is not ingressed
from the cluster and is only there for helpful debugging/admin tasks.