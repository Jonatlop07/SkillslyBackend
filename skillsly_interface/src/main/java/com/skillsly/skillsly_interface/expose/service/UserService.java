package com.skillsly.skillsly_interface.expose.service;


import com.netflix.graphql.dgs.client.GraphQLResponse;
import com.netflix.graphql.dgs.client.MonoGraphQLClient;
import com.netflix.graphql.dgs.client.WebClientGraphQLClient;
import com.skillsly.skillsly_interface.expose.data.GraphqlRequestBody;
import com.skillsly.skillsly_interface.expose.data.UserDto;
import com.skillsly.skillsly_interface.expose.utils.GraphqlSchemaReaderUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.management.Query;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private String url;

    public UserDto getUserDetails(String userId) throws IOException{

        url = "https://34.122.26.102.nip.io/graphql";

        WebClient newWebClient = WebClient.create(url);
        WebClientGraphQLClient client = MonoGraphQLClient.createWithWebClient(newWebClient);

        Map<String, String> variables = new HashMap<>();
        variables.put("id", userId);

        String query = "query user($id: String!){ \n" + 
        "user(id: $id){ \n " + 
        "name \n" +
        "email \n" +
        "} \n" + 
        "}";
        
        UserDto result = new UserDto();

        try {
            Mono<GraphQLResponse> graphQlResponseMono = client.reactiveExecuteQuery(query, variables);
            Mono<String> name = graphQlResponseMono.map(r -> r.extractValue("name"));
            name.subscribe();
            result.setName(name.block());
            return result;
        }catch (Exception e){
            e.printStackTrace();
        }

        // final String query = GraphqlSchemaReaderUtil.getSchemaFromFileName("getUserDetails.graphql");

        
        // WebClient webClient = WebClient.builder().build();
        // GraphqlRequestBody graphQLRequestBody = new GraphqlRequestBody();

        
        // final String variables = GraphqlSchemaReaderUtil.getSchemaFromFileName("variables.graphql");
    
        // graphQLRequestBody.setQuery(query);
        // graphQLRequestBody.setVariables(variables.replace("userId", userId));

       
        // result.setEmail("email");
        // result.setId("id");
        // result.setName("name");
        // webClient.post().
        //         uri(url).
        //         bodyValue(graphQLRequestBody).
        //         retrieve().
        //         bodyToMono(UserDto.class).
        //         block();

        System.out.print(result);

        return result;
    }

}
