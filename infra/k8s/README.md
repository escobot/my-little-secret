## K8s infrastructure

### Commands

Basic workflow
```sh
docker build -t pbgnz/mls-secrets .

docker push pbgnz/mls-secrets

kubectl apply -f .

kubectl rollout restart deployment [depl_name]
# note: start eventbus before query service
```

Running with ingress:
- add to /etc/hosts
```sh
minikube_ip secrets.com
```