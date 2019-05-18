package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.DocumentWordDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DocumentWord and its DTO DocumentWordDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface DocumentWordMapper extends EntityMapper<DocumentWordDTO, DocumentWord> {

    @Mapping(source = "document.id", target = "documentId")
    @Mapping(source = "document.title", target = "documentTitle")
    DocumentWordDTO toDto(DocumentWord documentWord);

    @Mapping(source = "documentId", target = "document")
    DocumentWord toEntity(DocumentWordDTO documentWordDTO);

    default DocumentWord fromId(Long id) {
        if (id == null) {
            return null;
        }
        DocumentWord documentWord = new DocumentWord();
        documentWord.setId(id);
        return documentWord;
    }
}
