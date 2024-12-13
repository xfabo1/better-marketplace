package org.bettermarketplace.db.dao;

import java.util.Optional;

import org.bettermarketplace.db.entity.FileReferenceDbo;
import org.bettermarketplace.model.FileReference;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.BindMethods;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
@RegisterConstructorMapper(FileReferenceDbo.class)
public interface FileReferenceDao {

    @SqlUpdate
    @GetGeneratedKeys
    @RegisterConstructorMapper(FileReference.class)
    Long insertFile(@BindBean("fileReference") FileReference fileReference);

    @SqlQuery
    Optional<FileReferenceDbo> selectFile(@Bind("id") Long id);

    @SqlUpdate
    void updateFile(@BindMethods("fileReference") FileReferenceDbo fileReference);
}
