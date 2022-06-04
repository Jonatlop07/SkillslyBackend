## Skillsly Auth Kubernetes Deployment Setup
### Auth service
In case where the image is not in dockerhub:
- `cd skillsly_auth_ms`
- `docker build -t skillsly-auth-ms .`
- `docker tag skillsly-auth-ms jonatlop07/skillsly-auth-ms`
- `docker push jonatlop07/skillsly-auth-ms`

Shortcut (in Powershell):

```
docker build -t skillsly-auth-ms . ;`
docker tag skillsly-auth-ms jonatlop07/skillsly-auth-ms ;`
docker push jonatlop07/skillsly-auth-ms ;
```

Create the auth microservice deployment:

- `kubectl apply -f skillsly-auth-ms-env-config-map.yaml`
- `kubectl apply -f skillsly-auth-ms-depl.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-auth-ms-env-config-map.yaml ;`
kubectl apply -f skillsly-auth-ms-depl.yaml ;
```

To display pods' logs:

- `kubectl get pods`
- `kubectl logs <pod-id>`

To delete auth microservice resources:

- `kubectl delete service skillsly-auth-ms-srv`
- `kubectl delete deployment skillsly-auth-ms-depl`
- `kubectl delete configmap skillsly-auth-ms-env-config`

Shortcut to delete all (in Powershell):

```
kubectl delete service skillsly-auth-ms-srv ;`
kubectl delete deployment skillsly-auth-ms-depl ;`
kubectl delete configmap skillsly-auth-ms-env-config ;`
```
