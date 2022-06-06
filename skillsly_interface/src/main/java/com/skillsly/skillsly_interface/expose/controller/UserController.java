package com.skillsly.skillsly_interface.expose.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillsly.skillsly_interface.expose.data.UserDto;
import com.skillsly.skillsly_interface.expose.data.UserResponseDto;
import com.skillsly.skillsly_interface.expose.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService = new UserService();

  // testing controller || need to consume groups 2D web service and expose data
  @GetMapping("user/{userId}")
  public UserDto getUser(@PathVariable("userId") String userId) {
    UserDto response = new UserDto();
    try {
      response = userService.getUserDetails(userId);
      // System.out.print(response);
      return response;
    } catch (Exception e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    // response.setEmail("email");
    return response;
  }
}
