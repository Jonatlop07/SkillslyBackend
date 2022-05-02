## Skillsly Notification Handler Kubernetes Deployment Setup
### Notification handler service
In case where the image is not in dockerhub:
- `cd skillsly_notification-handler_ms`
- `docker build -t skillsly-notification-handler-ms .`
- `docker tag skillsly-notification-handler-ms jonatlop07/skillsly-notification-handler-ms`
- `docker push <hub-user>/skillsly-notification-handler-ms`
