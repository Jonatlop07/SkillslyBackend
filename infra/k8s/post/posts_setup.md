## Skillsly Post Kubernetes Deployment Setup
### Post service
In case where the image is not in dockerhub:
- `cd skillsly_posts_ms`
- `docker build -t skillsly-posts-ms .`
- `docker tag skillsly-posts-ms jonatlop07/skillsly-posts-ms`
- `docker push jonatlop07/skillsly-posts-ms`

Shortcut (in Powershell):

```
docker build -t skillsly-posts-ms . ;`
docker tag skillsly-posts-ms jonatlop07/skillsly-posts-ms ;`
docker push jonathan07/skillsly-posts-ms ;
```

If not, create the posts db deployment:
- `cd infra/k8s/post`
- `kubectl apply -f skillsly-posts-db-env-config-map.yaml`
- `kubectl apply -f skillsly-posts-db-persistent-volume.yaml`
- `kubectl apply -f skillsly-posts-db-depl.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-posts-db-env-config-map.yaml ;`
kubectl apply -f skillsly-posts-db-persistent-volume.yaml ;`
kubectl apply -f skillsly-posts-db-depl.yaml ;
```

Get the posts-db pod ID:

- `kubectl get pods`

Create the posts microservice deployment:

- `kubectl apply -f skillsly-posts-ms-depl.yaml`

To display pods' logs:

- `kubectl get pods`
- `kubectl logs <pod-id>`

To delete posts microservice resources:

- `kubectl delete service skillsly-posts-ms-srv`
- `kubectl delete deployment skillsly-posts-ms-depl`

To delete posts db resources:

- `kubectl delete service skillsly-posts-db-srv`
- `kubectl delete deployment skillsly-posts-db-depl`
- `kubectl delete persistentvolumeclaims skillsly-posts-pv-claim`
- `kubectl delete persistentvolume skillsly-posts-db-persistent-volume`
- `kubectl delete configmap skillsly-posts-db-env-config`

Shortcut to delete all (in Powershell):

```
kubectl delete service skillsly-posts-ms-srv ;`
kubectl delete deployment skillsly-posts-ms-depl ;`
kubectl delete service skillsly-posts-db-srv ;`
kubectl delete deployment skillsly-posts-db-depl ;`
kubectl delete persistentvolumeclaims skillsly-posts-pv-claim ;`
kubectl delete persistentvolume skillsly-posts-db-persistent-volume ;`
kubectl delete configmap skillsly-posts-db-env-config ; 
```
