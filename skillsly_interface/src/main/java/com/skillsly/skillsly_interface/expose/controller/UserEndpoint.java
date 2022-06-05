package com.skillsly.skillsly_interface.expose.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import com.skillsly.skillsly_interface.expose.data.UserDto;
import com.skillsly.skillsly_interface.expose.service.UserService;
import io.spring.guides.gs_producing_web_service.GetUserRequest;
import io.spring.guides.gs_producing_web_service.GetUserResponse;
import io.spring.guides.gs_producing_web_service.User;


@Endpoint
public class UserEndpoint {
	private static final String NAMESPACE_URI = "http://spring.io/guides/gs-producing-web-service";

	private UserService userService;

	@Autowired
	public UserEndpoint(UserService userService) {
		this.userService = userService;
	}

	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "getUserRequest")
	@ResponsePayload
	public GetUserResponse getUser(@RequestPayload GetUserRequest request) {
		GetUserResponse response = new GetUserResponse();
		UserDto user_details = userService.getUserDetails(request.getUserId());
		User user = new User();
		user.setId(user_details.getId());
		user.setEmail(user_details.getEmail());
		user.setName(user_details.getName());
		response.setUser(user);
		return response;
	}
}