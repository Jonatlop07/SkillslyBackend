package com.skillsly.skillsly_interface.consume;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;

@Configuration
public class SongConfiguration {

  @Bean
  public Jaxb2Marshaller marshaller() {
    Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
    marshaller.setContextPath("com.example.consumingwebservice.wsdl");
    return marshaller;
  }

  @Bean
  public SongClient songClient(Jaxb2Marshaller marshaller) {
    SongClient client = new SongClient();
    client.setDefaultUri("http://34.123.106.254:3009/wsdl");
    client.setMarshaller(marshaller);
    client.setUnmarshaller(marshaller);
    return client;
  }
}
