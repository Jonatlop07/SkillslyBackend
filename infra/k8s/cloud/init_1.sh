#!/bin/bash

# Notification MQ deployment

kubectl apply -f ./notification_mq/skillsly-notification-mq-rbac.yaml
kubectl apply -f ./notification_mq/skillsly-notification-mq-secret.yaml
kubectl apply -f ./notification_mq/skillsly-notification-mq-config-map.yaml
kubectl apply -f ./notification_mq/skillsly-notification-mq-statefulset.yaml

# Notification Handler MS deployment

kubectl apply -f ./notification_handler/skillsly-notification-handler-redis-config-map.yaml
kubectl apply -f ./notification_handler/skillsly-notification-handler-redis-depl.yaml
kubectl apply -f ./notification_handler/skillsly-notification-handler-ms-env-config-map.yaml
kubectl apply -f ./notification_handler/skillsly-notification-handler-backend-config.yaml
kubectl apply -f ./notification_handler/skillsly-notification-handler-ms-depl.yaml

# Notification MS deployment

kubectl apply -f ./notification/skillsly-notification-ms-env-config-map.yaml ;
kubectl apply -f ./notification/skillsly-notification-ms-depl.yaml ;

# Ldap deployment

kubectl apply -f ./ldap/skillsly-ldap-env-config-map.yaml ;
kubectl apply -f ./ldap/skillsly-ldap-persistent-volume.yaml ;
kubectl apply -f ./ldap/skillsly-ldap-depl.yaml ;
kubectl apply -f ./ldap/skillsly-ldap-admin-depl.yaml ;

# Service MS deployment

kubectl apply -f ./service/skillsly-service-ms-depl.yaml

# Chat MS deployment

kubectl apply -f ./chat/skillsly-chat-ms-depl.yaml

# Comment MS deployment

kubectl apply -f ./comment/skillsly-comment-ms-env-config-map.yaml
kubectl apply -f ./comment/skillsly-comment-ms-depl.yaml

# Posts MS deployment

kubectl apply -f ./post/skillsly-posts-ms-depl.yaml

# Story MS deployment

kubectl apply -f ./story/skillsly-story-ms-env-config-map.yaml ;
kubectl apply -f ./story/skillsly-story-ms-depl.yaml ;

# User MS deployment

kubectl apply -f ./user/skillsly-user-ms-env-config-map.yaml ;
kubectl apply -f ./user/skillsly-user-ms-depl.yaml ;

# Auth MS deployment

kubectl apply -f ./auth/skillsly-auth-ms-env-config-map.yaml ;
kubectl apply -f ./auth/skillsly-auth-ms-depl.yaml ;

# API Gateway deployment

kubectl apply -f ./ag/skillsly-ag-redis-config-map.yaml ;
kubectl apply -f ./ag/skillsly-ag-redis-depl.yaml ;
kubectl apply -f ./ag/skillsly-ag-env-config-map.yaml ;
kubectl apply -f ./ag/skillsly-ag-depl.yaml ;

# Interface deployment

kubectl apply -f ./interface/skillsly-interface-depl.yaml

#db config
#gcloud sql connect skillsly-name-db --user=postgres
#\c postgres
#Paste script
#SELECT schema_name FROM information_schema.schemata;
