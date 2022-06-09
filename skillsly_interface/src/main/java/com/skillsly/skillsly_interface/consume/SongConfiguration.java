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
    client.setDefaultUri("https://lalu-soap.herokuapp.com/wsdl");
    client.setMarshaller(marshaller);
    client.setUnmarshaller(marshaller);
    return client;
  }
}
