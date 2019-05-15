package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.DocumentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Document and its DTO DocumentDTO.
 */
@Mapper(componentModel = "spring", uses = {ProjectMapper.class})
public interface DocumentMapper extends EntityMapper<DocumentDTO, Documents> {

    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "project.title", target = "projectTitle")
    DocumentDTO toDto(Documents document);

    @Mapping(target = "mainSteps", ignore = true)
    @Mapping(target = "collageEducations", ignore = true)
    @Mapping(target = "researcherHistories", ignore = true)
    @Mapping(target = "existingResearchProjects", ignore = true)
    @Mapping(target = "organizationPartners", ignore = true)
    @Mapping(target = "costSummaries", ignore = true)
    @Mapping(target = "foreCastCosts", ignore = true)
    @Mapping(source = "projectId", target = "project")
    Documents toEntity(DocumentDTO documentDTO);

    default Documents fromId(Long id) {
        if (id == null) {
            return null;
        }
        Documents document = new Documents();
        document.setId(id);
        return document;
    }
}
