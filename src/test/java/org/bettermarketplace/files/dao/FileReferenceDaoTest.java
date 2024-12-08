package org.bettermarketplace.files.dao;

import org.bettermarketplace.db.PostgisTest;
import org.bettermarketplace.files.entity.FileReference;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class FileReferenceDaoTest extends PostgisTest {

    @Autowired
    private  FileReferenceDao fileReferenceDao;

    @Test
    public void test_insertEntity_validEntity_entityPresentInDatabase() {
        FileReference fileReference = new FileReference();
        fileReference.setName("test");
        fileReference.setType("jpeg");
        fileReferenceDao.insertFile(fileReference);
    }
}