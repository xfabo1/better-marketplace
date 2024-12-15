package org.bettermarketplace.configuration;

import java.io.IOException;
import java.io.UncheckedIOException;

import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("postgres")
@DirtiesContext
public abstract class PostgisTest {

	private static final ObjectMapper OBJECT_MAPPER = new Jackson2ObjectMapperBuilder()
			.modules(new JavaTimeModule())
			.build();

	public static <T> T readResource(String path, Class<T> type) {
		try (var in = PostgisTest.class.getResourceAsStream(path)) {
			return OBJECT_MAPPER.readValue(in, type);
		} catch (IOException e) {
			throw new UncheckedIOException(e);
		}
	}

	public static <T> T readResource(String path, TypeReference<T> type) {
		try (var in = PostgisTest.class.getResourceAsStream(path)) {
			return OBJECT_MAPPER.readValue(in, type);
		} catch (IOException e) {
			throw new UncheckedIOException(e);
		}
	}
}
