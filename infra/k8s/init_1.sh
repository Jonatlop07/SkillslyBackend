#!/bin/bash

# Ldap deployment

kubectl apply -f ./ldap/skillsly-ldap-env-config-map.yaml
kubectl apply -f ./ldap/skillsly-ldap-persistent-volume.yaml
kubectl apply -f ./ldap/skillsly-ldap-depl.yaml
kubectl apply -f ./ldap/skillsly-ldap-admin-depl.yaml

# Service MS deployment

kubectl apply -f ./service/skillsly-service-ms-depl.yaml

# Notification MQ deployment

kubectl apply -f ./notification_mq/skillsly-notification-mq-rbac.yaml
kubectl apply -f ./notification_mq/skillsly-notification-mq-secret.yaml
kubectl apply -f ./notification_mq/skillsly-notification-mq-config-map.yaml
kubectl apply -f ./notification_mq/skillsly-notification-mq-statefulset.yaml

# Notification Handler MS deployment

kubectl apply -f ./notification_handler/skillsly-notification-handler-redis-config-map.yaml
kubectl apply -f ./notification_handler/skillsly-notification-handler-redis-depl.yaml
kubectl apply -f ./notification_handler/skillsly-notification-handler-ms-env-config-map.yaml
#kubectl apply -f ./notification_handler/skillsly-notification-handler-backend-config.yaml
kubectl apply -f ./notification_handler/skillsly-notification-handler-ms-depl.yaml

# Notification MS deployment

kubectl apply -f ./notification/skillsly-notification-db-secret.yaml
kubectl apply -f ./notification/skillsly-notification-db-env-config-map.yaml
kubectl apply -f ./notification/skillsly-notification-db-persistent-volume.yaml
kubectl apply -f ./notification/skillsly-notification-db-depl.yaml

# Story MS deployment

kubectl apply -f ./story/skillsly-story-db-secret.yaml
kubectl apply -f ./story/skillsly-story-db-env-config-map.yaml
kubectl apply -f ./story/skillsly-story-db-persistent-volume.yaml
kubectl apply -f ./story/skillsly-story-db-depl.yaml

# Posts MS deployment

kubectl apply -f ./post/skillsly-posts-db-env-config-map.yaml
kubectl apply -f ./post/skillsly-posts-db-persistent-volume.yaml
kubectl apply -f ./post/skillsly-posts-db-depl.yaml
kubectl apply -f ./post/skillsly-posts-ms-depl.yaml

# Comment MS deployment

kubectl apply -f ./comment/skillsly-comment-ms-env-config-map.yaml
kubectl apply -f ./comment/skillsly-comment-ms-depl.yaml

# User MS deployment

kubectl apply -f ./user/skillsly-user-db-secret.yaml
kubectl apply -f ./user/skillsly-user-db-env-config-map.yaml
kubectl apply -f ./user/skillsly-user-db-persistent-volume.yaml
kubectl apply -f ./user/skillsly-user-db-depl.yaml

# Auth MS deployment

kubectl apply -f ./auth/skillsly-auth-db-secret.yaml
kubectl apply -f ./auth/skillsly-auth-db-env-config-map.yaml
kubectl apply -f ./auth/skillsly-auth-db-persistent-volume.yaml
kubectl apply -f ./auth/skillsly-auth-db-depl.yaml

# API Gateway deployment

kubectl apply -f ./ag/skillsly-ag-redis-config-map.yaml
kubectl apply -f ./ag/skillsly-ag-redis-depl.yaml
kubectl apply -f ./ag/skillsly-ag-env-config-map.yaml
kubectl apply -f ./ag/skillsly-ag-depl.yaml
