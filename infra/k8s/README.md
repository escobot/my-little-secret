## K8s infrastructure

### Commands

```sh
docker build -t pbgnz/mls-secrets .

docker push pbgnz/mls-secrets

kubectl apply -f .

kubectl rollout restart deployment [depl_name]
# note: start eventbus before query service
```