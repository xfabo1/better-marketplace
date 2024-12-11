package org.bettermarketplace.db.dao;

import org.bettermarketplace.db.entity.UrbanDistrictDbo;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
@RegisterBeanMapper(UrbanDistrictDbo.class)
public interface UrbanDistrictDao {
}
