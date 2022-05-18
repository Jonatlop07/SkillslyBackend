package com.skillsly.rest.controller;

import com.skillsly.rest.model.PostModel;
import com.skillsly.rest.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @Operation(summary = "Create a new post", description = "Create a new post", tags = {"Post"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "successful operation", content = @Content(schema = @Schema(implementation = PostModel.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/posts")//create a post
    public ResponseEntity<PostModel> createPost(@RequestBody PostModel postModel) {
        return postService.save(postModel);
    }

    @Operation(summary = " Get all posts by owner_id", description = " Get all posts by owner_id", tags = {"Post"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = PostModel.class))),
            @ApiResponse(responseCode = "204", description = "No content"),
            @ApiResponse(responseCode = "400", description = "Invalid input")})
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/posts/{owner_id}")//get all posts by owner_id
    public ResponseEntity<List<PostModel>> getAllPostsByOwnerId(@PathVariable("owner_id") UUID owner_id) {
        return postService.findAllByOwnerId(owner_id);
    }

    @Operation(summary = " Get a post by id", description = " Get a post by id", tags = {"Post"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = PostModel.class))),
            @ApiResponse(responseCode = "404", description = "Post not found"),
            @ApiResponse(responseCode = "400", description = "Invalid input")})
    @GetMapping("/post/{postId}")//get a post by id
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Object> getPostByPostId(@PathVariable("postId") UUID postId) {
        return postService.findByPostId(postId);
    }

    @Operation(summary = " Delete a post by id", description = " Delete a post by id", tags = {"Post"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "successful operation", content = @Content(schema = @Schema(implementation = PostModel.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "404", description = "Post not found"),

    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/posts/{postId}")//delete a post by id
    public ResponseEntity<Object> deletePostByPostId(@PathVariable("postId") UUID postId) {
         return postService.deleteByPostId(postId);
    }

    @Operation(summary = " Update a post by id", description = " Update a post by id", tags = {"Post"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "successful operation", content = @Content(schema = @Schema(implementation = PostModel.class))),
            @ApiResponse(responseCode = "404", description = "Post not found"),
            @ApiResponse(responseCode = "400", description = "Invalid input")})
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping("/post")//update a post
    public ResponseEntity<PostModel> updatePost(@RequestBody PostModel post) {
        return postService.update(post);
    }
}

