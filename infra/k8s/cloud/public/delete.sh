#!/bin/bash

kubectl delete -f ./ag/skillsly-ag-service.yaml
kubectl delete -f ./interface/skillsly-interface-service.yaml
kubectl delete -f ./ldap/skillsly-ldap-service.yaml
kubectl delete -f ./notification/skillsly-notification-service.yaml
kubectl delete -f ./wa/skillsly-wa-service.yaml