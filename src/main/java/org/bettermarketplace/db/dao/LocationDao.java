package org.bettermarketplace.db.dao;

import java.util.List;
import java.util.Optional;

import org.bettermarketplace.db.entity.LocationDbo;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindMethods;
import org.jdbi.v3.sqlobject.statement.BatchChunkSize;
import org.jdbi.v3.sqlobject.statement.SqlBatch;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
@RegisterConstructorMapper(LocationDbo.class)
public interface LocationDao {

	@SqlQuery
	Optional<LocationDbo> findLocation(@Bind("id") String id);

	@SqlBatch
	@BatchChunkSize(1000)
	int[] insertLocations(@BindMethods("location") List<LocationDbo> locations);
}
