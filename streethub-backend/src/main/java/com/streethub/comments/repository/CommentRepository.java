package com.streethub.comments.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.streethub.comments.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, UUID> {

    List<Comment> findByPostIdOrderByCreatedAtDesc(UUID postId);

    long countByPostId(UUID postId);

    long countByAuthorId(UUID authorId);
}
