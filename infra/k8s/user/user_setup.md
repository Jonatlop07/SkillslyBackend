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

If not, create the user db deployment:
- `cd infra/k8s/user`

- `kubectl apply -f skillsly-user-db-secret.yaml`
- `kubectl apply -f skillsly-user-db-env-config-map.yaml`
- `kubectl apply -f skillsly-user-db-persistent-volume.yaml`
- `kubectl apply -f skillsly-user-db-depl.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-user-db-secret.yaml ;`
kubectl apply -f skillsly-user-db-env-config-map.yaml ;`
kubectl apply -f skillsly-user-db-persistent-volume.yaml ;`
kubectl apply -f skillsly-user-db-depl.yaml ;
```

Get the user-db pod ID:

- `kubectl get pods`
- `kubectl exec -it <pod-id> -- psql -d skillsly_user_db -U skillsly`

Paste the content of `skillsly-user-initdb.sql`, press enter, and then type `\q`

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

To delete user db resources:

- `kubectl delete service skillsly-user-db-srv`
- `kubectl delete deployment skillsly-user-db-depl`
- `kubectl delete persistentvolumeclaims skillsly-user-pv-claim`
- `kubectl delete persistentvolume skillsly-user-db-persistent-volume`
- `kubectl delete secret skillsly-user-db-secret`
- `kubectl delete configmap skillsly-user-db-env-config`

Shortcut to delete all (in Powershell):

```
kubectl delete service skillsly-user-ms-srv ;`
kubectl delete deployment skillsly-user-ms-depl ;`
kubectl delete configmap skillsly-user-ms-env-config ;`
kubectl delete service skillsly-user-db-srv ;`
kubectl delete deployment skillsly-user-db-depl ;`
kubectl delete persistentvolumeclaims skillsly-user-pv-claim ;`
kubectl delete secret skillsly-user-db-secret ;`
kubectl delete configmap skillsly-user-db-env-config ; 
```
