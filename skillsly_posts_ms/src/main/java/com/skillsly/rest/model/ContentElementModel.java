package com.skillsly.rest.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Data
public class ContentElementModel {
    @Id
    @JsonProperty("content_element_id")
    private Integer ContentElementId;

    @JsonProperty("description")
    private String description;

    @NotNull
    @NotEmpty
    @NotBlank
    @JsonProperty("media_locator")
    private String media;
}
