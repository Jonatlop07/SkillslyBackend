docker build -t skillsly_service_ms .
docker run -p 7000:7000 -e URL=0.0.0.0:7000 skillsly_service_ms