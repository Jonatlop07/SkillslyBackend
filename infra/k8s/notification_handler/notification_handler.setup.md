## Skillsly Notification Handler Kubernetes Deployment Setup
### Notification handler service
In case where the image is not in dockerhub:
- `cd skillsly_notification-handler_ms`
- `docker build -t skillsly-notification-handler-ms .`
- `docker tag skillsly-notification-handler-ms jonatlop07/skillsly-notification-handler-ms`
- `docker push jonatlop07/skillsly-notification-handler-ms`

```
kubectl apply -f skillsly-notification-handler-redis-config-map.yaml ;`
kubectl apply -f skillsly-notification-handler-redis-depl.yaml ;`
kubectl apply -f skillsly-notification-handler-ms-env-config-map.yaml ;`
kubectl apply -f skillsly-notification-handler-ms-depl.yaml
```

To enter the Redis CLI:

- `kubectl get pods`
- `kubectl exec -it <pod-id> -- redis-cli`
- Enter `PING` to check if it works

```
kubectl delete service skillsly-notification-handler-ms-srv ;`
kubectl delete deployment skillsly-notification-handler-ms-depl ;`
kubectl delete configmap skillsly-notification-handler-ms-env-config ;`
kubectl delete service skillsly-notification-handler-redis-srv ;`
kubectl delete deployment skillsly-notification-handler-redis-depl ;`
kubectl delete configmap skillsly-notification-handler-redis-config
```
