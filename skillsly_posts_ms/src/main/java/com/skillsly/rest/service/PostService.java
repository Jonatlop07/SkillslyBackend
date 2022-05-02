package com.skillsly.rest.service;

import com.skillsly.rest.model.PostModel;
import com.skillsly.rest.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostService {

    private static final Logger LOGGER = LogManager.getLogger(PostService.class);
    private final PostRepository postRepository;

    public ResponseEntity<PostModel> save(PostModel post) { //create
        try {
            if(!postRepository.existsByPostId(post.getPostId())){
                post.setPostId(UUID.randomUUID());
                post.setCreatedAt(Date.from(new Date().toInstant()));
                post.setUpdatedAt(Date.from(new Date().toInstant()));
                postRepository.save(post);
                LOGGER.info("Post created successfully with id: " + post.getPostId());
                return ResponseEntity.ok().body(post);
            }
            throw new RuntimeException("Post already exists");
        }catch (Exception e) {
            LOGGER.warn("Post already exists with id: " + post.getPostId());
            return ResponseEntity.unprocessableEntity().build();
        }
    }

    public ResponseEntity<PostModel> update(PostModel post) { //update
        try{
            if(postRepository.existsByPostId(post.getPostId())){
                post.setCreatedAt(postRepository.findByPostId(post.getPostId()).getCreatedAt());
                post.setUpdatedAt(Date.from(new Date().toInstant()));
                postRepository.save(post);
                LOGGER.info("Post updated successfully with id: " + post.getPostId());
                return ResponseEntity.ok().body(post);
            }
            throw new RuntimeException("Post not found");
        }catch (Exception e) {
            LOGGER.warn("Post not found with id: " + post.getPostId());
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<List<PostModel>> findAllByOwnerId(UUID id) {
        try {
            if(postRepository.existsByOwnerId(id)){
                LOGGER.info("Posts found with owner id: " + id);
                return ResponseEntity.ok().body(postRepository.findAllByOwnerId(id));
            }
            throw new RuntimeException("Owner not found");
        }catch (Exception e) {
            LOGGER.warn("Posts not found with owner id: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Object> findByPostId(UUID postId){
        try {
            if(postRepository.existsByPostId(postId)){
                LOGGER.info("Post found with id: " + postId);
                return ResponseEntity.ok().body(postRepository.findByPostId(postId));
            }
            throw new RuntimeException("Post not found");
        }catch (Exception e) {
            LOGGER.warn("Post not found with id: " + postId);
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Object> deleteByPostId(UUID postId){
        try{
            if(postRepository.existsByPostId(postId)){
                LOGGER.info("Post deleted with id: " + postId);
                PostModel post_deleted= postRepository.findByPostId(postId);
                postRepository.deleteByPostId(postId);
                return ResponseEntity.ok().body(post_deleted);
            }
            throw new RuntimeException("Post not found");
        }catch (Exception e) {
            LOGGER.warn("Post not found with id: " + postId);
            return ResponseEntity.notFound().build();
        }
    }
}
