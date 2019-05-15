package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.ForeCastCostDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ForeCastCost and its DTO ForeCastCostDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface ForeCastCostMapper extends EntityMapper<ForeCastCostDTO, ForeCastCost> {

    @Mapping(source = "document.id", target = "documentId")
    ForeCastCostDTO toDto(ForeCastCost foreCastCost);

    @Mapping(source = "documentId", target = "document")
    ForeCastCost toEntity(ForeCastCostDTO foreCastCostDTO);

    default ForeCastCost fromId(Long id) {
        if (id == null) {
            return null;
        }
        ForeCastCost foreCastCost = new ForeCastCost();
        foreCastCost.setId(id);
        return foreCastCost;
    }
}
