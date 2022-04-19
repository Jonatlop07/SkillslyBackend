package com.skillsly.rest.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Data
public class ContentElementModel {
    @Id
    private Integer ContentElementId;

    private String description;

    @NotNull
    @NotEmpty
    @NotBlank
    private String media;
}
