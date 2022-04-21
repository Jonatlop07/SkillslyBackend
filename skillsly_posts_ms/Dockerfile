## BUILD EXECUTABLE stage 1 ##
FROM openjdk:11 AS builder
WORKDIR /skillsly/build
COPY . .

## EXECUTE APPLICATION stage 2 ##
FROM openjdk:11 AS runtime
WORKDIR /skillsly/app
COPY --from=builder /skillsly/build/target/*.jar skillsly_posts_ms.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","skillsly_posts_ms.jar"]
CMD ["-start"]