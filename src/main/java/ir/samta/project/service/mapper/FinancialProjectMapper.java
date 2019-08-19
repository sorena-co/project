package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.FinancialProjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FinancialProject and its DTO FinancialProjectDTO.
 */
@Mapper(componentModel = "spring", uses = {ProjectMapper.class})
public interface FinancialProjectMapper extends EntityMapper<FinancialProjectDTO, FinancialProject> {

    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "project.title", target = "projectTitle")
    @Mapping(source = "targetProject.id", target = "targetProjectId")
    @Mapping(source = "targetProject.title", target = "targetProjectTitle")
    FinancialProjectDTO toDto(FinancialProject financialProject);

    @Mapping(source = "projectId", target = "project")
    @Mapping(source = "targetProjectId", target = "targetProject")
    FinancialProject toEntity(FinancialProjectDTO financialProjectDTO);

    default FinancialProject fromId(Long id) {
        if (id == null) {
            return null;
        }
        FinancialProject financialProject = new FinancialProject();
        financialProject.setId(id);
        return financialProject;
    }
}
