package com.streethub.posts.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.streethub.posts.entity.Post;

public interface PostRepository extends JpaRepository<Post, UUID> {

    List<Post> findByAuthorIdOrderByCreatedAtDesc(UUID authorId);

    long countByAuthorId(UUID authorId);
}
