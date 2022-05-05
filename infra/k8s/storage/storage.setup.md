## Skillsly Storage Microservice Kubernetes Deployment Setup
### Storage service
In case where the image is not in dockerhub:
- `cd skillsly_storage_ms`
- `docker build -t skillsly-storage-ms .`
- `docker tag skillsly-storage-ms jonatlop07/skillsly-storage-ms`
- `docker push jonatlop07/skillsly-storage-ms`

```
kubectl apply -f skillsly-storage-ms-depl.yaml
```

- `kubectl get pods`

```
kubectl delete service skillsly-storage-ms-srv ;`
kubectl delete deployment skillsly-storage-ms-depl ;`
```
