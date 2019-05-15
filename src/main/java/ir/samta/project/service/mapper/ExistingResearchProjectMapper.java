package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.ExistingResearchProjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ExistingResearchProject and its DTO ExistingResearchProjectDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ExistingResearchProjectMapper extends EntityMapper<ExistingResearchProjectDTO, ExistingResearchProject> {



    default ExistingResearchProject fromId(Long id) {
        if (id == null) {
            return null;
        }
        ExistingResearchProject existingResearchProject = new ExistingResearchProject();
        existingResearchProject.setId(id);
        return existingResearchProject;
    }
}
