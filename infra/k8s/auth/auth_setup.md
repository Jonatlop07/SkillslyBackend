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

If not, create the auth db deployment:
- `cd infra/k8s/auth`

- `kubectl apply -f skillsly-auth-db-secret.yaml`
- `kubectl apply -f skillsly-auth-db-env-config-map.yaml`
- `kubectl apply -f skillsly-auth-db-persistent-volume.yaml`
- `kubectl apply -f skillsly-auth-db-depl.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-auth-db-secret.yaml ;`
kubectl apply -f skillsly-auth-db-env-config-map.yaml ;`
kubectl apply -f skillsly-auth-db-persistent-volume.yaml ;`
kubectl apply -f skillsly-auth-db-depl.yaml ;
```

Get the auth-db pod ID:

- `kubectl get pods`
- `kubectl exec -it <pod-id> -- psql -d skillsly_auth_db -U skillsly`

Paste the content of `skillsly-auth-initdb.sql`, press enter, and then type `\q`

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

To delete auth db resources:

- `kubectl delete service skillsly-auth-db-srv`
- `kubectl delete deployment skillsly-auth-db-depl`
- `kubectl delete persistentvolumeclaims skillsly-auth-pv-claim`
- `kubectl delete persistentvolume skillsly-auth-db-persistent-volume`
- `kubectl delete secret skillsly-auth-db-secret`
- `kubectl delete configmap skillsly-auth-db-env-config`

Shortcut to delete all (in Powershell):

```
kubectl delete service skillsly-auth-ms-srv ;`
kubectl delete deployment skillsly-auth-ms-depl ;`
kubectl delete configmap skillsly-auth-ms-env-config ;`
kubectl delete service skillsly-auth-db-srv ;`
kubectl delete deployment skillsly-auth-db-depl ;`
kubectl delete persistentvolumeclaims skillsly-auth-pv-claim ;`
kubectl delete persistentvolume skillsly-auth-db-persistent-volume ;`
kubectl delete secret skillsly-auth-db-secret ;`
kubectl delete configmap skillsly-auth-db-env-config ; 
```
