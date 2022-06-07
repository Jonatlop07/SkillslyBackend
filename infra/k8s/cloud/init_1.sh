#!/bin/bash

# Ldap deployment

kubectl apply -f ./ldap/skillsly-ldap-env-config-map.yaml ;
kubectl apply -f ./ldap/skillsly-ldap-persistent-volume.yaml ;
kubectl apply -f ./ldap/skillsly-ldap-depl.yaml ;
kubectl apply -f ./ldap/skillsly-ldap-admin-depl.yaml ;

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
