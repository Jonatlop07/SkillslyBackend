package com.skillsly.skillsly_interface.expose.data;

public class UserResponseDto {

  private Data data;

  public Data getData() {
    return data;
  }

  public class Data {

    private User user;

    public User getUser() {
      return user;
    }

    public class User {
      private String id;
      private String name;
      private String email;

      public String getEmail() {
        return email;
      }

      public String getName() {
        return name;
      }

      public String getId() {
        return id;
      }

      public void setEmail(String email) {
        this.email = email;
      }

      public void setName(String name) {
        this.name = name;
      }

      public void setId(String id) {
        this.id = id;
      }
    }
  }
}