FROM rust:1.56.1 as builder
WORKDIR /usr/src/skillsly_story_ms
COPY . .
ENV DATABASE_URL=postgresql://skillsly:story@172.17.0.2/skillsly_story_db
ARG DATABASE_URL=postgresql://skillsly:story@172.17.0.2/skillsly_story_db
RUN cargo install sqlx-cli
RUN sqlx database setup --database-url $DATABASE_URL
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8000
RUN cargo install --bin skillsly_story_ms --path .

FROM debian:buster-slim
RUN apt-get update && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/skillsly_story_ms /usr/local/bin/skillsly_story_ms
ENV DATABASE_URL=postgresql://skillsly:story@172.17.0.2/skillsly_story_db
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8000
CMD ["skillsly_story_ms"]
