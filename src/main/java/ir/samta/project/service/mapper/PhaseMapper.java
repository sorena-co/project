package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.PhaseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Phase and its DTO PhaseDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PhaseMapper extends EntityMapper<PhaseDTO, Phase> {



    default Phase fromId(Long id) {
        if (id == null) {
            return null;
        }
        Phase phase = new Phase();
        phase.setId(id);
        return phase;
    }
}
