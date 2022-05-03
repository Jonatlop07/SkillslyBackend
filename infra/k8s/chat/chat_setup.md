## Skillsly Chat Kubernetes Deployment Setup
### Chat service
In case where the image is not in dockerhub:
- `cd skillsly_chat_ms`
- `docker build -t skillsly-chat-ms .`
- `docker tag skillsly-chat-ms jonatlop07/skillsly-chat-ms`
- `docker push jonatlop07/skillsly-chat-ms`

Shortcut (in Powershell):

```
docker build -t skillsly-chat-ms . ;`
docker tag skillsly-chat-ms jonatlop07/skillsly-chat-ms ;`
docker push jonathan07/skillsly-chat-ms ;
```

If not, create the chat db deployment:
- `cd infra/k8s/chat`
- `kubectl apply -f skillsly-chat-db-env-config-map.yaml`
- `kubectl apply -f skillsly-chat-db-persistent-volume.yaml`
- `kubectl apply -f skillsly-chat-db-depl.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-chat-db-env-config-map.yaml ;`
kubectl apply -f skillsly-chat-db-persistent-volume.yaml ;`
kubectl apply -f skillsly-chat-db-depl.yaml ;
```

Get the chat-db pod ID:

- `kubectl get pods`

Create the chat microservice deployment:

- `kubectl apply -f skillsly-chat-ms-depl.yaml`

To display pods' logs:

- `kubectl get pods`
- `kubectl logs <pod-id>`

To delete chat microservice resources:

- `kubectl delete service skillsly-chat-ms-srv`
- `kubectl delete deployment skillsly-chat-ms-depl`

To delete chat db resources:

- `kubectl delete service skillsly-chat-db-srv`
- `kubectl delete deployment skillsly-chat-db-depl`
- `kubectl delete persistentvolumeclaims skillsly-chat-pv-claim`
- `kubectl delete persistentvolume skillsly-chat-db-persistent-volume`
- `kubectl delete configmap skillsly-chat-db-env-config`

Shortcut to delete all (in Powershell):

```
kubectl delete service skillsly-chat-ms-srv ;`
kubectl delete deployment skillsly-chat-ms-depl ;`
kubectl delete service skillsly-chat-db-srv ;`
kubectl delete deployment skillsly-chat-db-depl ;`
kubectl delete persistentvolumeclaims skillsly-chat-pv-claim ;`
kubectl delete persistentvolume skillsly-chat-db-persistent-volume ;`
kubectl delete configmap skillsly-chat-db-env-config ; 
```
