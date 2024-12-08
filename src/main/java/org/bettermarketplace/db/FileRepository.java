package org.bettermarketplace.db;

import org.bettermarketplace.db.dao.FileReferenceDao;
import org.bettermarketplace.db.entity.FileReference;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class FileRepository {

    private final FileReferenceDao fileReferenceDao;

    public FileRepository(FileReferenceDao fileReferenceDao) {
        this.fileReferenceDao = fileReferenceDao;
    }

    public FileReference saveAndReturn(FileReference fileReference) {
        var id = fileReferenceDao.insertFile(fileReference);
        fileReference.setId(id);
        return fileReference;
    }

    public void update(FileReference fileReference) {
        fileReferenceDao.update(fileReference);
    }

    public Optional<FileReference> findById(Long id) {
        return fileReferenceDao.selectFile(id);
    }
}
