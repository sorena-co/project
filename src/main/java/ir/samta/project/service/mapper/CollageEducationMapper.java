package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.CollageEducationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CollageEducation and its DTO CollageEducationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CollageEducationMapper extends EntityMapper<CollageEducationDTO, CollageEducation> {



    default CollageEducation fromId(Long id) {
        if (id == null) {
            return null;
        }
        CollageEducation collageEducation = new CollageEducation();
        collageEducation.setId(id);
        return collageEducation;
    }
}
