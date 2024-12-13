package org.bettermarketplace.db.dao;

import java.util.stream.Stream;

import org.bettermarketplace.db.entity.LocationDbo;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.BindList;
import org.jdbi.v3.sqlobject.statement.SqlBatch;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
@RegisterConstructorMapper(LocationDbo.class)
public interface LocationDao {

	@SqlBatch
	int[] insertUrbanDistricts(@BindList("urbanDistricts") Stream<LocationDbo> urbanDistricts);
}
