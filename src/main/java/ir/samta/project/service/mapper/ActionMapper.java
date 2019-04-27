package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.ActionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Action and its DTO ActionDTO.
 */
@Mapper(componentModel = "spring", uses = {PhaseMapper.class})
public interface ActionMapper extends EntityMapper<ActionDTO, Action> {

    @Mapping(source = "phase.id", target = "phaseId")
    @Mapping(source = "phase.title", target = "phaseTitle")
    ActionDTO toDto(Action action);

    @Mapping(source = "phaseId", target = "phase")
    Action toEntity(ActionDTO actionDTO);

    default Action fromId(Long id) {
        if (id == null) {
            return null;
        }
        Action action = new Action();
        action.setId(id);
        return action;
    }
}
