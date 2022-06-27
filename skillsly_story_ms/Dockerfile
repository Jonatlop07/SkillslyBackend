FROM rust:1.61 as builder

WORKDIR /usr/src/skillsly_story_ms
COPY . .

RUN cargo install sqlx-cli --version 0.5.13

#ARG DATABASE_URL=postgres://skillsly:story@10.100.132.143:5432/skillsly_story_db
ARG DATABASE_URL=postgres://postgres:story@35.225.171.171/postgres
RUN sqlx database setup --database-url $DATABASE_URL

ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=3000

RUN cargo install --bin skillsly_story_ms --path .

FROM debian:buster-slim

RUN apt-get update && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/local/cargo/bin/skillsly_story_ms /usr/local/bin/skillsly_story_ms

ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=3000

CMD ["skillsly_story_ms"]
