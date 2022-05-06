pod_name=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" | grep skillsly-notification-db)
cat ./notification/skillsly-notification-initdb.sql | kubectl exec -i "${pod_name}" -- psql -d skillsly_notification_db -U skillsly
kubectl apply -f ./notification/skillsly-notification-ms-env-config-map.yaml
kubectl apply -f ./notification/skillsly-notification-ms-depl.yaml

pod_name=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" | grep skillsly-story-db)
cat ./story/skillsly-story-initdb.sql | kubectl exec -i "${pod_name}" -- psql -d skillsly_story_db -U skillsly
kubectl apply -f ./story/skillsly-story-ms-env-config-map.yaml
kubectl apply -f ./story/skillsly-story-ms-depl.yaml

pod_name=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" | grep skillsly-user-db)
cat ./user/skillsly-user-initdb.sql | kubectl exec -i "${pod_name}" -- psql -d skillsly_user_db -U skillsly
kubectl apply -f ./user/skillsly-user-ms-env-config-map.yaml
kubectl apply -f ./user/skillsly-user-ms-depl.yaml

pod_name=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" | grep skillsly-auth-db)
cat ./auth/skillsly-auth-initdb.sql | kubectl exec -i "${pod_name}" -- psql -d skillsly_auth_db -U skillsly
kubectl apply -f ./auth/skillsly-auth-ms-env-config-map.yaml
kubectl apply -f ./auth/skillsly-auth-ms-depl.yaml
