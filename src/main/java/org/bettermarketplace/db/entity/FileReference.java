package org.bettermarketplace.db.entity;

import lombok.Data;

import java.time.Instant;

@Data
public class FileReference {

    private Long id;
    private Instant created;
    private Instant updated;
    private String name;
    private String type;
}

