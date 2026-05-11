package com.streethub.posts.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record PostResponse(
        UUID id,
        UUID authorId,
        String content,
        long votesGl,
        long votesRl,
        long commentsCount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}
