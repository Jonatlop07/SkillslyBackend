## Skillsly User Kubernetes Deployment Setup
### User service
In case where the image is not in dockerhub:
- `cd skillsly_user_ms`
- `docker build -t skillsly-user-ms .`
- `docker tag skillsly-user-ms jonatlop07/skillsly-user-ms`
- `docker push <hub-user>/skillsly-user-ms`

If not, create the user db deployment:
- `cd infra/k8s/user`
- `kubectl apply -f skillsly-user-db-depl.yaml`

Get the user-db pod ID:

- `kubectl get pods`
- `kubectl exec -it <pod-id> -- psql -d skillsly_user_db -U skillsly`

Paste the content of `/skillsly_user_ms/skillsly_user_db.sql`, press enter, and then type `\q`

Create the user microservice deployment:

- `kubectl apply -f skillsly-user-ms-depl.yaml`

To display pods' logs:

- `kubectl get pods`
- `kubectl logs <pod-id>`

To delete user microservice resources:

- `kubectl delete service skillsly-user-ms-srv`
- `kubectl delete deployment skillsly-user-ms-depl`

To delete user db resources:

- `kubectl delete service skillsly-user-db-srv`
- `kubectl delete deployment skillsly-user-db-depl`
- `kubectl delete persistentvolumeclaims skillsly-user-db-pv-claim`
- `kubectl delete persistentvolume skillsly-user-db-pv-volume`
