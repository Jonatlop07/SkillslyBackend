## Skillsly Notification Kubernetes Deployment Setup
### Notification service
In case where the image is not in dockerhub:
- `cd skillsly_notification_ms`
- `docker build -t skillsly-notification-ms .`
- `docker tag skillsly-notification-ms jonatlop07/skillsly-notification-ms`
- `docker push jonathan07/skillsly-notification-ms`

Shortcut (in Powershell):

```
docker build -t skillsly-notification-ms . ;`
docker tag skillsly-notification-ms jonatlop07/skillsly-notification-ms ;`
docker push jonathan07/skillsly-notification-ms ;
```

If not, create the notification db deployment:
- `cd infra/k8s/notification`

- `kubectl apply -f skillsly-notification-db-secret.yaml`
- `kubectl apply -f skillsly-notification-db-env-config-map.yaml`
- `kubectl apply -f skillsly-notification-db-persistent-volume.yaml`
- `kubectl apply -f skillsly-notification-db-depl.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-notification-db-secret.yaml ;`
kubectl apply -f skillsly-notification-db-env-config-map.yaml ;`
kubectl apply -f skillsly-notification-db-persistent-volume.yaml ;`
kubectl apply -f skillsly-notification-db-depl.yaml
```

Get the notification-db pod ID:

- `kubectl get pods`
- `kubectl exec -it <pod-id> -- psql -d skillsly_notification_db -U skillsly`

Paste the content of `skillsly-notification-initdb.sql`, press enter, and then type `\q`

Deploy the message queue:

- `kubectl apply -f skillsly-notification-mq-secret.yaml`
- `kubectl apply -f skillsly-notification-mq-persistent-volume.yaml`
- `kubectl apply -f skillsly-notification-mq-depl.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-notification-mq-secret.yaml ;`
kubectl apply -f skillsly-notification-mq-persistent-volume.yaml ;`
kubectl apply -f skillsly-notification-mq-depl.yaml
```

Create the notification microservice deployment:

- `kubectl apply -f skillsly-notification-ms-env-config-map.yaml`
- `kubectl apply -f skillsly-notification-ms-depl.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-notification-ms-env-config-map.yaml ;`
kubectl apply -f skillsly-notification-ms-depl.yaml
```

To display pods' logs:

- `kubectl get pods`
- `kubectl logs <pod-id>`

To delete rabbitmq message queue resources:

- `kubectl delete service skillsly-notification-mq-srv`
- `kubectl delete statefulsets skillsly-notification-mq-depl`
- `kubectl delete persistentvolumeclaims skillsly-notification-mq-pv-claim`
- `kubectl delete persistentvolume skillsly-notification-mq-persistent-volume`
- `kubectl delete secret skillsly-notification-mq-secret`

To delete notification microservice resources:

- `kubectl delete service skillsly-notification-ms-srv`
- `kubectl delete deployment skillsly-notification-ms-depl`
- `kubectl delete configmap skillsly-notification-ms-env-config`

To delete notification db resources:

- `kubectl delete service skillsly-notification-db-srv`
- `kubectl delete deployment skillsly-notification-db-depl`
- `kubectl delete persistentvolumeclaims skillsly-notification-db-pv-claim`
- `kubectl delete persistentvolume skillsly-notification-db-persistent-volume`
- `kubectl delete secret skillsly-notification-db-secret`
- `kubectl delete configmap skillsly-notification-db-env-config`

Shortcut to delete all (in Powershell):

```
kubectl delete service skillsly-notification-mq-srv ;`
kubectl delete statefulsets skillsly-notification-mq-depl ;`
kubectl delete persistentvolumeclaims skillsly-notification-mq-pv-claim ;`
kubectl delete persistentvolume skillsly-notification-mq-persistent-volume ;`
kubectl delete secret skillsly-notification-mq-secret ;`
kubectl delete service skillsly-notification-ms-srv ;`
kubectl delete deployment skillsly-notification-ms-depl ;`
kubectl delete configmap skillsly-notification-ms-env-config ;`
kubectl delete service skillsly-notification-db-srv ;`
kubectl delete deployment skillsly-notification-db-depl ;`
kubectl delete persistentvolumeclaims skillsly-notification-db-pv-claim ;`
kubectl delete persistentvolume skillsly-notification-db-persistent-volume ;`
kubectl delete secret skillsly-notification-db-secret ;`
kubectl delete configmap skillsly-notification-db-env-config
```
