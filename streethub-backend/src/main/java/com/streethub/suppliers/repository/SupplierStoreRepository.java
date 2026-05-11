package com.streethub.suppliers.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.streethub.suppliers.entity.SupplierStore;
import com.streethub.suppliers.entity.SupplierStore.Platform;

public interface SupplierStoreRepository extends JpaRepository<SupplierStore, UUID> {

    List<SupplierStore> findByUserIdOrderByCreatedAtDesc(UUID userId);

    List<SupplierStore> findByPlatformOrderByCreatedAtDesc(Platform platform);

    long countByUserId(UUID userId);
}
