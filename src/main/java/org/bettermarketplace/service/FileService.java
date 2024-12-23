package org.bettermarketplace.service;

import java.io.IOError;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bettermarketplace.api.dto.OpenedFileDto;
import org.bettermarketplace.api.dto.RenameFileDto;
import org.bettermarketplace.db.dao.FileReferenceDao;
import org.bettermarketplace.db.entity.FileReferenceDbo;
import org.bettermarketplace.mapper.FileReferenceMapper;
import org.bettermarketplace.model.FileReference;
import org.jdbi.v3.sqlobject.transaction.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

    private static final FileReferenceMapper MAPPER = FileReferenceMapper.INSTANCE;

    private final FileReferenceDao fileReferenceDao;
    private final Path directory;

    @Autowired
    public FileService(FileReferenceDao fileReferenceDao, @Value("${file-service.storage-directory}") String directory) {
        this.fileReferenceDao = fileReferenceDao;
        this.directory = Path.of(directory);
    }

    public FileReferenceDbo rename(Long id, RenameFileDto renameFileDto) {
        Optional<FileReferenceDbo> file = fileReferenceDao.selectFile(id);
        if (file.isEmpty()) {
            return null;
        }

        var fileReferenceDbo = file.get();
        var updatedFileReference = MAPPER.from(fileReferenceDbo, renameFileDto);
        fileReferenceDao.updateFile(updatedFileReference);
        return updatedFileReference;
    }

    public OpenedFileDto openFile(Long id) {
        Optional<FileReferenceDbo> file = fileReferenceDao.selectFile(id);

        if (file.isEmpty()) {
            return null;
        }

        try (InputStream inputStream = Files.newInputStream(createPath(id))) {
            return OpenedFileDto.from(file.get(), inputStream.readAllBytes());
        } catch (IOException e) {
           throw new IOError(e);
        }
    }

    @Transaction
    public List<OpenedFileDto> createFiles(List<MultipartFile> multipartFiles) {
        return multipartFiles.stream().map(this::createReference).collect(Collectors.toList());
    }

    private OpenedFileDto createReference(MultipartFile file) {
        var fileReference = FileReference.builder()
                .name(file.getName())
                .type(file.getContentType())
                .build();

        var id = fileReferenceDao.insertFile(fileReference);
        var fileReferenceDbo = MAPPER.from(id, fileReference);

        return createFileOnFs(file, fileReferenceDbo);
    }

    private OpenedFileDto createFileOnFs(MultipartFile file, FileReferenceDbo fileReference) {
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, createPath(fileReference.id()), StandardCopyOption.REPLACE_EXISTING);
            return OpenedFileDto.from(fileReference, inputStream.readAllBytes());
        } catch (IOException e) {
            throw new IOError(e);
        }
    }

    private Path createPath(Long id) {
        return Path.of(directory.toString(), id.toString());
    }
}
