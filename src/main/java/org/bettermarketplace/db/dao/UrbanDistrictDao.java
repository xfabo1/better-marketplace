package org.bettermarketplace.db.dao;

import org.bettermarketplace.db.entity.UrbanDistrict;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
@RegisterBeanMapper(UrbanDistrict.class)
public interface UrbanDistrictDao {
}
