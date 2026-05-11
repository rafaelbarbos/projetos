package com.streethub.comments.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record CommentResponse(
        UUID id,
        UUID postId,
        UUID authorId,
        String content,
        long votesGl,
        long votesRl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}
