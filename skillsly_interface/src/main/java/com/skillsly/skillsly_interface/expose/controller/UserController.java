package com.skillsly.skillsly_interface.expose.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillsly.skillsly_interface.expose.data.UserDto;
import com.skillsly.skillsly_interface.expose.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class UserController {

  private UserService userService;

  @GetMapping("user")
  public UserDto getUser(@PathVariable("userId") String userId){
    return userService.getUserDetails(userId);
  }
}