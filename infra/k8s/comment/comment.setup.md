## Skillsly Comment Microservice Kubernetes Deployment Setup
### Comment service
In case where the image is not in dockerhub:
- `cd skillsly_comment_ms`
- `docker build -t skillsly-comment-ms .`
- `docker tag skillsly-comment-ms jonatlop07/skillsly-comment-ms`
- `docker push jonatlop07/skillsly-comment-ms`

```
kubectl apply -f skillsly-comment-ms-env-config-map.yaml ;`
kubectl apply -f skillsly-comment-ms-depl.yaml
```

- `kubectl get pods`

```
kubectl delete service skillsly-comment-ms-srv ;`
kubectl delete deployment skillsly-comment-ms-depl ;`
kubectl delete configmap skillsly-comment-ms-env-config
```
