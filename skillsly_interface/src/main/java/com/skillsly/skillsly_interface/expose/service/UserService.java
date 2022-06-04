package com.skillsly.skillsly_interface.expose.service;

import com.skillsly.skillsly_interface.expose.data.GraphqlRequestBody;
import com.skillsly.skillsly_interface.expose.data.UserDto;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;

@Service
public class UserService {
    private String url;

    public void CountryClient(/*@Value("http://api.skillsly.io/graphql")*/ String url) {
        this.url = url;
    }
    public UserDto getUserDetails(final String userId) throws IOException {

        WebClient webClient = WebClient.builder().build();

        GraphqlRequestBody graphQLRequestBody = new GraphqlRequestBody();

        graphQLRequestBody.setQuery(
                "query getUserDetails($userId: String!) {\n" +
                        "  user(id: $userId) {\n" +
                        "    id\n" +
                        "    name\n" +
                        "  }\n" +
                        "}");
        graphQLRequestBody.setVariables("{\"userId\": \"" + userId + "\"}");

        return webClient.
                post().
                uri(url).
                bodyValue(graphQLRequestBody).
                retrieve().
                bodyToMono(UserDto.class).
                block();
    }

}
