package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.PhaseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Phase and its DTO PhaseDTO.
 */
@Mapper(componentModel = "spring", uses = {ProjectMapper.class})
public interface PhaseMapper extends EntityMapper<PhaseDTO, Phase> {

    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "project.title", target = "projectTitle")
    PhaseDTO toDto(Phase phase);

    @Mapping(source = "projectId", target = "project")
    Phase toEntity(PhaseDTO phaseDTO);

    default Phase fromId(Long id) {
        if (id == null) {
            return null;
        }
        Phase phase = new Phase();
        phase.setId(id);
        return phase;
    }
}
