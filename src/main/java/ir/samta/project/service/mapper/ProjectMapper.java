package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.ProjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Project and its DTO ProjectDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ProjectMapper extends EntityMapper<ProjectDTO, Project> {


    default Project fromId(Long id) {
        if (id == null) {
            return null;
        }
        Project project = new Project();
        project.setId(id);
        return project;
    }
}
