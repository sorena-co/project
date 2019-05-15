package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.MainStepDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MainStep and its DTO MainStepDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface MainStepMapper extends EntityMapper<MainStepDTO, MainStep> {

    @Mapping(source = "document.id", target = "documentId")
    MainStepDTO toDto(MainStep mainStep);

    @Mapping(source = "documentId", target = "document")
    MainStep toEntity(MainStepDTO mainStepDTO);

    default MainStep fromId(Long id) {
        if (id == null) {
            return null;
        }
        MainStep mainStep = new MainStep();
        mainStep.setId(id);
        return mainStep;
    }
}
