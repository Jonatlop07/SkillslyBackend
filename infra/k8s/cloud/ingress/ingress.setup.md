## Skillsly Ingress Setup

Be sure `minikube` is installed in your system, its highly recommended to run this ingress in a linux-based environment

Now, follow this steps:

1. Run `minikube start`
2. Run `minikube addons enable ingress`
3. Run the `init_x.sh` scripts
4. Then go to the ingress folder and execute `kubectl apply -f skillsly-ingress.yaml`
5. Run `kubectl get ing` and be sure that it shows the IP Address for the ingress service (it could take a few seconds)
6. When the IP Address is shown in the console, add this line `<ingress_ip_address> api.skillsly.dev` in the `etc/hosts` file 