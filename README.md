# my-little-secret
platform to post your little secrets

## Requirements

- [docker](https://docs.docker.com/desktop/)
- [minikube](https://minikube.sigs.k8s.io/docs/start/)
- [skaffold](https://skaffold.dev/docs/install/)

## Dev

Add the following to your /etc/hosts file:
```sh
minikube_ip secrets.com
```

Run using skaffold:
```bash
skaffold dev
```

Open app in web browser
```bash
http://secrets.com
```

## Architecture
![Architecture diagram](https://user-images.githubusercontent.com/20388583/120805367-bbc17380-c513-11eb-9ff2-430c6bfd45b9.png)
