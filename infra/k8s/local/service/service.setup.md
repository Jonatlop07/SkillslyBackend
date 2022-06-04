## Skillsly Service Request Microservice Kubernetes Deployment Setup
### Service Request service
In case where the image is not in dockerhub:
- `cd skillsly_service_ms`
- `docker build -t skillsly-service-ms .`
- `docker tag skillsly-service-ms jonatlop07/skillsly-service-ms`
- `docker push jonatlop07/skillsly-service-ms`

```
kubectl apply -f skillsly-service-ms-depl.yaml
```

- `kubectl get pods`

```
kubectl delete service skillsly-service-ms-srv ;`
kubectl delete deployment skillsly-service-ms-depl
```
