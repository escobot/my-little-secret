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
In the browser select the 'Advanced option' and type: 'thisisunsafe'

## Architecture
![Architecture diagram](https://user-images.githubusercontent.com/20388583/120859194-dd415000-c551-11eb-9c1d-428e27467778.png)
