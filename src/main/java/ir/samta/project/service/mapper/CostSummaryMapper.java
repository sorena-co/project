package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.CostSummaryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CostSummary and its DTO CostSummaryDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface CostSummaryMapper extends EntityMapper<CostSummaryDTO, CostSummary> {

    @Mapping(source = "document.id", target = "documentId")
    CostSummaryDTO toDto(CostSummary costSummary);

    @Mapping(source = "documentId", target = "document")
    CostSummary toEntity(CostSummaryDTO costSummaryDTO);

    default CostSummary fromId(Long id) {
        if (id == null) {
            return null;
        }
        CostSummary costSummary = new CostSummary();
        costSummary.setId(id);
        return costSummary;
    }
}
