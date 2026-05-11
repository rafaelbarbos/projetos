package com.streethub.users.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String username,
        String displayName,
        String email,
        String avatar,
        String bio,
        boolean verified,
        long followersCount,
        long followingCount,
        long reputation,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}