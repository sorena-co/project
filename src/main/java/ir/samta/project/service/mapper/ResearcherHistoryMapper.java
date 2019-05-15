package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.ResearcherHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ResearcherHistory and its DTO ResearcherHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ResearcherHistoryMapper extends EntityMapper<ResearcherHistoryDTO, ResearcherHistory> {



    default ResearcherHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        ResearcherHistory researcherHistory = new ResearcherHistory();
        researcherHistory.setId(id);
        return researcherHistory;
    }
}
