package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.ResearcherHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ResearcherHistory and its DTO ResearcherHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface ResearcherHistoryMapper extends EntityMapper<ResearcherHistoryDTO, ResearcherHistory> {

    @Mapping(source = "document.id", target = "documentId")
    ResearcherHistoryDTO toDto(ResearcherHistory researcherHistory);

    @Mapping(source = "documentId", target = "document")
    ResearcherHistory toEntity(ResearcherHistoryDTO researcherHistoryDTO);

    default ResearcherHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        ResearcherHistory researcherHistory = new ResearcherHistory();
        researcherHistory.setId(id);
        return researcherHistory;
    }
}
