## Skillsly User Kubernetes Deployment Setup
### User service
In case where the image is not in dockerhub:
- `cd skillsly_user_ms`
- `docker build -t skillsly-user-ms .`
- `docker tag skillsly-user-ms jonatlop07/skillsly-user-ms`
- `docker push jonatlop07/skillsly-user-ms`

Shortcut (in Powershell):

```
docker build -t skillsly-user-ms . ;`
docker tag skillsly-user-ms jonatlop07/skillsly-user-ms ;`
docker push jonathan07/skillsly-user-ms ;
```

Create the user microservice deployment:

- `kubectl apply -f skillsly-user-ms-env-config-map.yaml`
- `kubectl apply -f skillsly-user-ms-depl.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-user-ms-env-config-map.yaml ;`
kubectl apply -f skillsly-user-ms-depl.yaml ;
```

To display pods' logs:

- `kubectl get pods`
- `kubectl logs <pod-id>`

To delete user microservice resources:

- `kubectl delete service skillsly-user-ms-srv`
- `kubectl delete deployment skillsly-user-ms-depl`
- `kubectl delete configmap skillsly-user-ms-env-config`

Shortcut to delete all (in Powershell):

```
kubectl delete service skillsly-user-ms-srv ;`
kubectl delete deployment skillsly-user-ms-depl ;`
kubectl delete configmap skillsly-user-ms-env-config ;`
```
