# Chat microservice

## Considerations


This microservice should run in a Linux environment, it was developed in that environment and the expected deployment will be in a Linux environment

The following are the requeriments:

1. Go language following [this link](https://go.dev/dl/) 
2. Docker and docker compose

Then, you can proceed running the following comand

`make run`

And the project will be constructed and deployed with all these dependencies

The two docker containers are the MongoDB container and the Linux Alpine version (to run the microservice)

## Available requests
You can see this [postman collection](https://go.postman.co/workspace/Swarch_2022i~d921e027-7017-4779-b2f2-ba52b8ef7870/collection/18249068-3a7481db-e96a-45e5-808a-47c5ad58f2b2?action=share&creator=18249068) for know more about the API requests
