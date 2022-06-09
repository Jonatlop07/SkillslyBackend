package com.skillsly.skillsly_interface.consume;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

import com.example.consumingwebservice.wsdl.Request;
import com.example.consumingwebservice.wsdl.Response;

public class SongClient extends WebServiceGatewaySupport {
  private static final Logger log = LoggerFactory.getLogger(SongClient.class);

  public Response getSong(String id) {
    Request request = new Request();
    log.info("Requesting song with id: " + id);
    request.setId(id);

    Response response = (Response) getWebServiceTemplate()
        .marshalSendAndReceive("https://lalu-soap.herokuapp.com/wsdl", request);
    return response;
  }
}
