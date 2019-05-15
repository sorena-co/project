package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.ExistingResearchProjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ExistingResearchProject and its DTO ExistingResearchProjectDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface ExistingResearchProjectMapper extends EntityMapper<ExistingResearchProjectDTO, ExistingResearchProject> {

    @Mapping(source = "document.id", target = "documentId")
    ExistingResearchProjectDTO toDto(ExistingResearchProject existingResearchProject);

    @Mapping(source = "documentId", target = "document")
    ExistingResearchProject toEntity(ExistingResearchProjectDTO existingResearchProjectDTO);

    default ExistingResearchProject fromId(Long id) {
        if (id == null) {
            return null;
        }
        ExistingResearchProject existingResearchProject = new ExistingResearchProject();
        existingResearchProject.setId(id);
        return existingResearchProject;
    }
}
