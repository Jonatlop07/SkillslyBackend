## Skillsly Notification Message Queue Kubernetes Deployment Setup
### Notification Message Queue

Deploy the message queue:

- `kubectl apply -f skillsly-notification-mq-rbac.yaml`
- `kubectl apply -f skillsly-notification-mq-secret.yaml`
- `kubectl apply -f skillsly-notification-mq-config-map.yaml`
- `kubectl apply -f skillsly-notification-mq-statefulset.yaml`

Shortcut (in Powershell):

```
kubectl apply -f skillsly-notification-mq-rbac.yaml
kubectl apply -f skillsly-notification-mq-secret.yaml
kubectl apply -f skillsly-notification-mq-config-map.yaml
kubectl apply -f skillsly-notification-mq-statefulset.yaml
```

- `kubectl port-forward skillsly-notification-mq-0 30008:5672`

To delete rabbitmq message queue resources:

- `kubectl delete service skillsly-notification-mq-srv`
- `kubectl delete statefulsets skillsly-notification-mq`
- `kubectl delete configmap skillsly-notification-mq-config`
- `kubectl delete secret skillsly-notification-mq-secret`
- `kubectl delete role.rbac.authorization.k8s.io skillsly-notification-rabbitmq`

```
kubectl delete service skillsly-notification-mq-srv
kubectl delete statefulsets skillsly-notification-mq
kubectl delete persistentvolumeclaims data-skillsly-notification-mq-0
kubectl delete configmap skillsly-notification-mq-config
kubectl delete secret skillsly-notification-mq-secret
kubectl delete rolebinding.rbac.authorization.k8s.io skillsly-notification-rabbitmq-rb
kubectl delete role.rbac.authorization.k8s.io skillsly-notification-rabbitmq-role
kubectl delete serviceaccount skillsly-notification-rabbitmq-sa
```

- ```
   kubectl exec -it skillsly-notification-mq-0 -- rabbitmqctl --erlang-cookie ZFIXAKTGGFOIHYEXEDSZ set_policy ha-fed \
  ".*" '{"federation-upstream-set":"all", "ha-sync-mode":"automatic", "ha-mode":"nodes", "ha-params":["rabbit@skillsly-notification-mq-0.skillsly-notification-mq-srv.svc.cluster.local"]}' \
  --priority 1 \
  --apply-to queues
  ```
