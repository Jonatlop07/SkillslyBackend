## Skillsly Story Kubernetes Deployment Setup
### Story service

In case where the image is not in dockerhub:
- `cd skillsly_story_ms`
- `docker build -t skillsly-story-ms .`
- `docker tag skillsly-story-ms jonatlop07/skillsly-story-ms`
- `docker push jonatlop07/skillsly-story-ms`

Shortcut (in Powershell):

```
docker build -t skillsly-story-ms . ;`
docker tag skillsly-story-ms jonatlop07/skillsly-story-ms ;`
docker push jonathan07/skillsly-story-ms ;
```

If not, create the story db deployment:
- `cd infra/k8s/story`

- `kubectl apply -f skillsly-story-db-secret.yaml`
- `kubectl apply -f skillsly-story-db-env-config-map.yaml`
- `kubectl apply -f skillsly-story-db-persistent-volume.yaml`
- `kubectl apply -f skillsly-story-db-depl.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-story-db-secret.yaml ;`
kubectl apply -f skillsly-story-db-env-config-map.yaml ;`
kubectl apply -f skillsly-story-db-persistent-volume.yaml ;`
kubectl apply -f skillsly-story-db-depl.yaml ;
```

Get the story-db pod ID:

- `kubectl get pods`
- `kubectl exec -it <pod-id> -- psql -d skillsly_story_db -U skillsly`

Paste the content of `skillsly-story-initdb.sql`, press enter, and then type `\q`

Create the story microservice deployment:

- `kubectl apply -f skillsly-story-ms-env-config-map.yaml`
- `kubectl apply -f skillsly-story-ms-depl.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-story-ms-env-config-map.yaml ;`
kubectl apply -f skillsly-story-ms-depl.yaml ;
```

To display pods' logs:

- `kubectl get pods`
- `kubectl logs <pod-id>`

To delete story microservice resources:

- `kubectl delete service skillsly-story-ms-srv`
- `kubectl delete deployment skillsly-story-ms-depl`
- `kubectl delete configmap skillsly-story-ms-env-config`

To delete story db resources:

- `kubectl delete service skillsly-story-db-srv`
- `kubectl delete deployment skillsly-story-db-depl`
- `kubectl delete persistentvolumeclaims skillsly-story-pv-claim`
- `kubectl delete persistentvolume skillsly-story-db-persistent-volume`
- `kubectl delete secret skillsly-story-db-secret`
- `kubectl delete configmap skillsly-story-db-env-config`

Shortcut to delete all (in Powershell):

```
kubectl delete service skillsly-story-ms-srv ;`
kubectl delete deployment skillsly-story-ms-depl ;`
kubectl delete configmap skillsly-story-ms-env-config ;`
kubectl delete service skillsly-story-db-srv ;`
kubectl delete deployment skillsly-story-db-depl ;`
kubectl delete persistentvolumeclaims skillsly-story-pv-claim ;`
kubectl delete secret skillsly-story-db-secret ;`
kubectl delete configmap skillsly-story-db-env-config ; 
```
