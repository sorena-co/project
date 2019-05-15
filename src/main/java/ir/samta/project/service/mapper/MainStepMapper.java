package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.MainStepDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MainStep and its DTO MainStepDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MainStepMapper extends EntityMapper<MainStepDTO, MainStep> {



    default MainStep fromId(Long id) {
        if (id == null) {
            return null;
        }
        MainStep mainStep = new MainStep();
        mainStep.setId(id);
        return mainStep;
    }
}
