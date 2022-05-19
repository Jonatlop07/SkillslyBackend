#!/bin/sh
kubectl delete service skillsly-service-ms-srv
kubectl delete deployment skillsly-service-ms-depl

kubectl delete service skillsly-notification-mq-srv
kubectl delete statefulsets skillsly-notification-mq
kubectl delete persistentvolumeclaims data-skillsly-notification-mq-0
kubectl delete configmap skillsly-notification-mq-config
kubectl delete secret skillsly-notification-mq-secret
kubectl delete rolebinding.rbac.authorization.k8s.io skillsly-notification-rabbitmq-rb
kubectl delete role.rbac.authorization.k8s.io skillsly-notification-rabbitmq-role
kubectl delete serviceaccount skillsly-notification-rabbitmq-sa


kubectl delete service skillsly-notification-handler-ms-srv
kubectl delete deployment skillsly-notification-handler-ms-depl
kubectl delete configmap skillsly-notification-handler-ms-env-config
kubectl delete service skillsly-notification-handler-redis-srv
kubectl delete deployment skillsly-notification-handler-redis-depl
kubectl delete configmap skillsly-notification-handler-redis-config

kubectl delete service skillsly-notification-ms-srv
kubectl delete deployment skillsly-notification-ms-depl
kubectl delete configmap skillsly-notification-ms-env-config
kubectl delete service skillsly-notification-db-srv
kubectl delete deployment skillsly-notification-db-depl
kubectl delete persistentvolumeclaims skillsly-notification-db-pv-claim
kubectl delete persistentvolume skillsly-notification-db-persistent-volume
kubectl delete secret skillsly-notification-db-secret
kubectl delete configmap skillsly-notification-db-env-config

kubectl delete service skillsly-story-ms-srv
kubectl delete deployment skillsly-story-ms-depl
kubectl delete configmap skillsly-story-ms-env-config
kubectl delete service skillsly-story-db-srv
kubectl delete deployment skillsly-story-db-depl
kubectl delete persistentvolumeclaims skillsly-story-pv-claim
kubectl delete persistentvolume skillsly-story-db-persistent-volume
kubectl delete secret skillsly-story-db-secret
kubectl delete configmap skillsly-story-db-env-config

kubectl delete service skillsly-posts-ms-srv
kubectl delete deployment skillsly-posts-ms-depl
kubectl delete service skillsly-posts-db-srv
kubectl delete deployment skillsly-posts-db-depl
kubectl delete persistentvolumeclaims skillsly-posts-pv-claim
kubectl delete persistentvolume skillsly-posts-db-persistent-volume
kubectl delete configmap skillsly-posts-db-env-config

kubectl delete service skillsly-comment-ms-srv
kubectl delete deployment skillsly-comment-ms-depl
kubectl delete configmap skillsly-comment-ms-env-config

kubectl delete service skillsly-user-ms-srv
kubectl delete deployment skillsly-user-ms-depl
kubectl delete configmap skillsly-user-ms-env-config
kubectl delete service skillsly-user-db-srv
kubectl delete deployment skillsly-user-db-depl
kubectl delete persistentvolumeclaims skillsly-user-pv-claim
kubectl delete persistentvolume skillsly-user-db-persistent-volume
kubectl delete secret skillsly-user-db-secret
kubectl delete configmap skillsly-user-db-env-config

kubectl delete service skillsly-auth-ms-srv
kubectl delete deployment skillsly-auth-ms-depl
kubectl delete configmap skillsly-auth-ms-env-config
kubectl delete service skillsly-auth-db-srv
kubectl delete deployment skillsly-auth-db-depl
kubectl delete persistentvolumeclaims skillsly-auth-pv-claim
kubectl delete persistentvolume skillsly-auth-db-persistent-volume
kubectl delete secret skillsly-auth-db-secret
kubectl delete configmap skillsly-auth-db-env-config

kubectl delete service skillsly-ag-srv
kubectl delete deployment skillsly-ag-depl
kubectl delete configmap skillsly-ag-env-config
kubectl delete service skillsly-ag-redis-srv
kubectl delete deployment skillsly-ag-redis-depl
kubectl delete configmap skillsly-ag-redis-config

#kubectl delete ingress skillsly-backend-ingress
#kubectl delete ingress skillsly-frontend-ingress
#kubectl delete ingress-class ngnx
#kubectl delete all  --all -n ingress-nginx
