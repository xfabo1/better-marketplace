package org.bettermarketplace.db.dao;

import org.bettermarketplace.db.entity.FileReferenceDbo;
import org.bettermarketplace.model.FileReference;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

import java.util.Optional;

@UseStringTemplateSqlLocator
@RegisterBeanMapper(FileReferenceDbo.class)
public interface FileReferenceDao {

    @SqlUpdate
    @GetGeneratedKeys
    Long insertFile(@BindBean("fileReference") FileReference fileReference);

    @SqlQuery
    Optional<FileReferenceDbo> selectFile(@Bind("id") Long id);

    @SqlUpdate
    void update(@BindBean("fileReference") FileReferenceDbo fileReference);
}
