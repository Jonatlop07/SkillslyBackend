package com.skillsly.skillsly_interface.expose.data;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@AllArgsConstructor
@NoArgsConstructor
public class GraphqlRequestBody {

    private String query;
    private Object variables;

    public void setQuery(String query) {
      this.query = query;
    }

    public void setVariables(Object variables) {
      this.variables = variables;
    }
}