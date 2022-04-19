package com.skillsly.rest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;


@SpringBootApplication
public class SkillslyPostsMsApplication {

    private static final Logger LOGGER = LogManager.getLogger(SkillslyPostsMsApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(SkillslyPostsMsApplication.class, args);
        LOGGER.info("Skillsly Posts Microservice is up and running");
    }
}
