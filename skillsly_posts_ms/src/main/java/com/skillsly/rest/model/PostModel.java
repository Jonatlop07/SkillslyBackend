package com.skillsly.rest.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.annotation.Generated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

@Document(value = "Posts")
@Data
public class PostModel {

    @Id
    @Generated("UUID")
    @JsonProperty("post_id")
    private UUID postId;

    @NotNull
    @NotEmpty
    @NotBlank
    @JsonProperty("owner_id")
    private UUID ownerId;

    @JsonProperty("description")
    private String description;

    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @JsonProperty("created_at")
    private Date createdAt;

    @LastModifiedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @JsonProperty("updated_at")
    private Date updatedAt;

    @NotNull
    @NotEmpty
    @NotBlank
    @JsonProperty("privacy")
    private String privacy;

    @NotNull
    @NotEmpty
    @NotBlank
    @JsonProperty("content_element")
    private ArrayList<ContentElementModel> contentElements;
}
