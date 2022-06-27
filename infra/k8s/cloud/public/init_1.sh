#!/bin/bash

kubectl apply -f ./ag/skillsly-ag-service.yaml
kubectl apply -f ./interface/skillsly-interface-service.yaml
kubectl apply -f ./ldap/skillsly-ldap-service.yaml
kubectl apply -f ./notification/skillsly-notification-service.yaml
kubectl apply -f ./wa/skillsly-wa-service.yaml