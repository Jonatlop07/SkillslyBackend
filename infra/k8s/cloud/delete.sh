#!/bin/sh
kubectl delete service skillsly-ldap-admin-srv ;
kubectl delete deployment skillsly-ldap-admin-depl ;
kubectl delete service skillsly-ldap-srv ;
kubectl delete deployment skillsly-ldap-depl ;
kubectl delete persistentvolumeclaims skillsly-ldap-pv-claim ;
kubectl delete persistentvolume skillsly-ldap-persistent-volume ;
kubectl delete configmap skillsly-ldap-env-config ;

kubectl delete service skillsly-user-ms-srv ;
kubectl delete deployment skillsly-user-ms-depl ;
kubectl delete configmap skillsly-user-ms-env-config ;

kubectl delete service skillsly-auth-ms-srv ;
kubectl delete deployment skillsly-auth-ms-depl ;
kubectl delete configmap skillsly-auth-ms-env-config ;

kubectl delete service skillsly-ag-srv ;
kubectl delete deployment skillsly-ag-depl ;
kubectl delete configmap skillsly-ag-env-config ;
kubectl delete service skillsly-ag-redis-srv ;
kubectl delete deployment skillsly-ag-redis-depl ;
kubectl delete configmap skillsly-ag-redis-config ;

kubectl delete deployment skillsly-interface-depl ;
kubectl delete service skillsly-interface-srv ;
