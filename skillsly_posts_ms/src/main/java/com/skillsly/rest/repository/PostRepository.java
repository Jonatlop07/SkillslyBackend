package com.skillsly.rest.repository;

import com.skillsly.rest.model.PostModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.UUID;

@Repository
public interface PostRepository extends MongoRepository<PostModel,String> {
    ArrayList<PostModel> findAllByOwnerId(UUID userId);
    PostModel findByPostId(UUID postId);
    void deleteByPostId(UUID postId);

    boolean existsByPostId(UUID postId);

    boolean existsByOwnerId(UUID id);
}
