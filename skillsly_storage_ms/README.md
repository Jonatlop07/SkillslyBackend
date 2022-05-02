docker build -t skillsly_storage_ms .  

docker run -p 4000:4000 -e URL=0.0.0.0:4000 skillsly_storage_ms