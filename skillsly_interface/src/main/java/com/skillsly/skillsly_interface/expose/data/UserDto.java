package com.skillsly.skillsly_interface.expose.data;

import lombok.Getter;

@Getter
public class UserDto {
    private String id;
    private String name;
    private String email;

    public String getEmail() {
      return email;
    }

    public String getId() {
      return id;
    }

    public String getName() {
      return name;
    }
}
