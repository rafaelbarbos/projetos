package com.streethub.suppliers.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.streethub.suppliers.entity.SupplierStore.Platform;

public record SupplierStoreResponse(
        UUID id,
        UUID userId,
        String name,
        Platform platform,
        String profileUrl,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}
