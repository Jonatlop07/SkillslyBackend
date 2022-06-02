## Skillsly Ingress Setup

Be sure `minikube` is installed in your system, its highly recommended to run this ingress in a linux-based environment

Now, follow this steps:

1. Run `minikube start`
2. Run `minikube addons enable ingress`
3. Run the `init_x.sh` scripts
4. Then go to the ingress folder and execute `kubectl apply -f skillsly-ingress.yaml`
5. Run `kubectl get ing` and be sure that it shows the IP Address for the ingress service (it could take a few seconds)
6. When the IP Address is shown in the console, add this line `<ingress_ip_address> api.skillsly.dev` in the `etc/hosts` file 
6. Finally you can make requests under the `http://api.skillsly.dev/graphql` endpoint 


In case where the image is not in dockerhub:
- `cd skillsly_comment_ms`
- `docker build -t skillsly-comment-ms .`
- `docker tag skillsly-comment-ms jonatlop07/skillsly-comment-ms`
- `docker push jonatlop07/skillsly-comment-ms`

```
kubectl apply -f skillsly-comment-ms-env-config-map.yaml ;`
kubectl apply -f skillsly-comment-ms-depl.yaml
```

- `kubectl get pods`

```
kubectl delete service skillsly-comment-ms-srv ;`
kubectl delete deployment skillsly-comment-ms-depl ;`
kubectl delete configmap skillsly-comment-ms-env-config
```
