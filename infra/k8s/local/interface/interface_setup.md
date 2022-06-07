## Skillsly Interface Kubernetes Deployment Setup
### Interface component
In case where the image is not in dockerhub:
- `cd skillsly_interface`
- `docker build -t skillsly-interface .`
- `docker tag skillsly-interface jonatlop07/skillsly-interface`
- `docker push jonatlop07/skillsly-interface`

Shortcut (in Powershell):

```
docker build -t skillsly-interface . ;`
docker tag skillsly-interface jonatlop07/skillsly-interface ;`
docker push jonatlop07/skillsly-interface ;
```

