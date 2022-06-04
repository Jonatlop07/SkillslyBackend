## Skillsly API Gateway Kubernetes Deployment Setup
### API Gateway service
In case where the image is not in dockerhub:
- `cd skillsly_ag`
- `docker build -t skillsly-ag .`
- `docker tag skillsly-ag jonatlop07/skillsly-ag`
- `docker push jonatlop07/skillsly-ag`

```
kubectl apply -f skillsly-ag-redis-config-map.yaml ;`
kubectl apply -f skillsly-ag-redis-depl.yaml ;`
kubectl apply -f skillsly-ag-env-config-map.yaml ;`
kubectl apply -f skillsly-ag-depl.yaml
```

To enter the Redis CLI:

- `kubectl get pods`
- `kubectl exec -it <pod-id> -- redis-cli`
- Enter `PING` to check if it works

```
kubectl delete service skillsly-ag-srv ;`
kubectl delete deployment skillsly-ag-depl ;`
kubectl delete configmap skillsly-ag-env-config ;`
kubectl delete service skillsly-ag-redis-srv ;`
kubectl delete deployment skillsly-ag-redis-depl ;`
kubectl delete configmap skillsly-ag-redis-config
```


- Ldap -> Cluster
- Ldap Admin -> Cluster
- Ingress + certs -> Cluster
- Web Frontend + certs -> GCloud Service
- API Gateway -> Cluster
- Redis for API Gateway -> Cluster
- Auth MS -> Cluster
- Auth DB -> GCloud Service
- User MS -> Cluster
- User DB -> GCloud Service
- Interface Component -> Cluster
