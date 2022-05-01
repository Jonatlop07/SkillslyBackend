## Skillsly Notification Kubernetes Deployment Setup
### Notification service
In case where the image is not in dockerhub:
- `cd skillsly_notification_ms`
- `docker build -t skillsly-notification-ms .`
- `docker tag skillsly-notification-ms jonatlop07/skillsly-notification-ms`
- `docker push <hub-user>/skillsly-notification-ms`

If not, create the notification db deployment:
- `cd infra/k8s/notification`
- `kubectl apply -f skillsly-notification-db-depl.yaml`

Get the notification-db pod ID:

- `kubectl get pods`
- `kubectl exec -it <pod-id> -- psql -d skillsly_notification_db -U skillsly`

Paste the content of `/skillsly_notification_ms/skillsly_notification_db.sql`, press enter, and then type `\q`

Create the notification microservice deployment:

- `kubectl apply -f skillsly-notification-ms-depl.yaml`

To display pods' logs:

- `kubectl get pods`
- `kubectl logs <pod-id>`

To delete notification microservice resources:

- `kubectl delete service skillsly-notification-ms-srv`
- `kubectl delete deployment skillsly-notification-ms-depl`

To delete notification db resources:

- `kubectl delete service skillsly-notification-db-srv`
- `kubectl delete deployment skillsly-notification-db-depl`
- `kubectl delete persistentvolumeclaims skillsly-notification-db-pv-claim`
- `kubectl delete persistentvolume skillsly-notification-db-pv-volume`
