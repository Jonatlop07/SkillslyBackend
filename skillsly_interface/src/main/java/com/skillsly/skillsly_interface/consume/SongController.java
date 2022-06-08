package com.skillsly.skillsly_interface.consume;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.consumingwebservice.wsdl.Response;

@RestController
@RequestMapping("/")
public class SongController {

  @Autowired
  private SongClient songClient;

  @GetMapping("song/{id}")
  public Response getUser(@PathVariable("id") String id) {

    Response res = songClient.getSong(id);
    return res;
  }
}
