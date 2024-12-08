package org.bettermarketplace.db;

import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;


public class PostgisContainer extends PostgreSQLContainer<PostgisContainer> {

    private static final String DEFAULT_IMAGE = "postgis/postgis:17-3.5";
    private static PostgisContainer container;

    private PostgisContainer() {
        super(DockerImageName.parse(DEFAULT_IMAGE));
    }

    public static PostgisContainer getInstance() {
        if (container == null) {
            container = new PostgisContainer();
            container.withDatabaseName("marketplace")
                    .withUsername("test")
                    .withPassword("testpassword");
        }
        return container;
    }

    @Override
    public void start() {
        super.start();
        System.setProperty("DB_URL", container.getJdbcUrl());
        System.setProperty("DB_USERNAME", container.getUsername());
        System.setProperty("DB_PASSWORD", container.getPassword());
    }

    @Override
    public void stop() {
        // Do nothing, let JVM handle it
    }
}