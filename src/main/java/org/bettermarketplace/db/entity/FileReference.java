package org.bettermarketplace.db.entity;

import java.time.Instant;

import lombok.Data;

@Data
public class FileReference {

    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private String type;
}

