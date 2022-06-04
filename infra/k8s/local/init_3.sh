kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f ./ingress/skillsly-ingress-class.yaml
kubectl apply -f ./ingress/skillsly-ingress.yaml
