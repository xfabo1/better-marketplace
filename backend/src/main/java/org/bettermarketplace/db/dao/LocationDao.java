package org.bettermarketplace.db.dao;

import java.util.List;
import java.util.Optional;

import org.bettermarketplace.db.entity.LocationDbo;
import org.bettermarketplace.model.Location;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.BatchChunkSize;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlBatch;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
@RegisterConstructorMapper(LocationDbo.class)
public interface LocationDao {

	@SqlQuery
	Optional<LocationDbo> findLocation(@Bind("id") Long id);

	@SqlQuery
	List<LocationDbo> findLocations();

	@SqlBatch
	@BatchChunkSize(1000)
	@GetGeneratedKeys
	int[] insertLocations(@BindBean("location") List<Location> locations);

	@SqlUpdate
	@GetGeneratedKeys
	Long insertLocation(@BindBean("location") Location locationObject);

	@SqlUpdate
	void deleteLocation(@Bind("id") Long id);
}
