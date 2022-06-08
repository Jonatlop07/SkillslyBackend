package com.skillsly.skillsly_interface.expose;

import com.skillsly.skillsly_interface.expose.data.GraphqlRequestBody;
import com.skillsly.skillsly_interface.expose.data.UserDto;
import com.skillsly.skillsly_interface.expose.data.UserResponseDto;
import com.skillsly.skillsly_interface.expose.utils.GraphqlSchemaReaderUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private String url;

    public UserDto getUserDetails(String userId) throws IOException {

        url = "https://api.skillsly.app/graphql";

        UserDto result = new UserDto();

        final String query = GraphqlSchemaReaderUtil.getSchemaFromFileName("getUserDetails.graphql");

        WebClient webClient = WebClient.builder().build();
        GraphqlRequestBody graphQLRequestBody = new GraphqlRequestBody();

        final String variables = GraphqlSchemaReaderUtil.getSchemaFromFileName("variables.graphql");

        graphQLRequestBody.setQuery(query);
        graphQLRequestBody.setVariables(variables.replace("userId", userId));

        var res = webClient.post().uri(url).bodyValue(graphQLRequestBody).retrieve().bodyToMono(UserResponseDto.class)
                .block();

        assert res != null;
        result.setEmail(res.getData().getUser().getEmail());
        result.setName(res.getData().getUser().getName());
        result.setId(res.getData().getUser().getId());
        return result;
    }

}
