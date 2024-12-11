package org.bettermarketplace.dao;

import static org.assertj.core.api.Assertions.assertThat;

import org.bettermarketplace.configuration.PostgisTest;
import org.bettermarketplace.db.dao.FileReferenceDao;
import org.bettermarketplace.db.entity.FileReferenceDbo;
import org.bettermarketplace.model.FileReference;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class FileReferenceDaoTest extends PostgisTest {

    @Autowired
    private FileReferenceDao fileReferenceDao;

    @Test
    public void insertEntity_validEntity_entityPresentInDatabase() {
        var fileReference = new FileReference();
        fileReference.setName("test");
        fileReference.setType("jpeg");

		var id = fileReferenceDao.insertFile(fileReference);
		var fileReferenceDbo = fileReferenceDao.selectFile(id);

        assertThat(fileReferenceDbo).isPresent();
        assertThat(fileReferenceDbo.get())
                .returns("test", FileReferenceDbo::name)
                .returns("jpeg", FileReferenceDbo::type);
    }

    @Test
    public void updateFileEntity_validEntity_entityUpdated() {
        var fileReference = new FileReference();
        fileReference.setName("test");
        fileReference.setType("jpeg");

        var id = fileReferenceDao.insertFile(fileReference);
        var fileReferenceDbo = fileReferenceDao.selectFile(id);

        assertThat(fileReferenceDbo).isPresent();
        assertThat(fileReferenceDbo.get()).returns("test", FileReferenceDbo::name);

        fileReference.setName("changedName");
        fileReferenceDao.updateFile(FileReferenceDbo.from(id, fileReference));
        var updatedFileDbo = fileReferenceDao.selectFile(id);

        assertThat(updatedFileDbo).isPresent();
        assertThat(updatedFileDbo.get()).returns("changedName", FileReferenceDbo::name);
    }
}
