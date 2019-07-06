package ir.samta.project.service;

import ir.samta.project.domain.ForeCastCost;
import ir.samta.project.repository.ForeCastCostRepository;
import ir.samta.project.service.dto.ForeCastCostDTO;
import ir.samta.project.service.mapper.ForeCastCostMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


/**
 * Service Implementation for managing ForeCastCost.
 */
@Service
@Transactional
public class ForeCastCostService {

    private final Logger log = LoggerFactory.getLogger(ForeCastCostService.class);

    private final ForeCastCostRepository foreCastCostRepository;

    private final ForeCastCostMapper foreCastCostMapper;

    public ForeCastCostService(ForeCastCostRepository foreCastCostRepository, ForeCastCostMapper foreCastCostMapper) {
        this.foreCastCostRepository = foreCastCostRepository;
        this.foreCastCostMapper = foreCastCostMapper;
    }

    /**
     * Save a foreCastCost.
     *
     * @param foreCastCostDTO the entity to save
     * @return the persisted entity
     */
    public ForeCastCostDTO save(ForeCastCostDTO foreCastCostDTO) {
        log.debug("Request to save ForeCastCost : {}", foreCastCostDTO);
        ForeCastCost foreCastCost = foreCastCostMapper.toEntity(foreCastCostDTO);
        foreCastCost = foreCastCostRepository.save(foreCastCost);
        ForeCastCostDTO result = foreCastCostMapper.toDto(foreCastCost);
        return result;
    }

    /**
     * Get all the foreCastCosts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ForeCastCostDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ForeCastCosts");
        return foreCastCostRepository.findAll(pageable)
            .map(foreCastCostMapper::toDto);
    }


    /**
     * Get one foreCastCost by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ForeCastCostDTO> findOne(Long id) {
        log.debug("Request to get ForeCastCost : {}", id);
        return foreCastCostRepository.findById(id)
            .map(foreCastCostMapper::toDto);
    }

    /**
     * Delete the foreCastCost by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ForeCastCost : {}", id);
        foreCastCostRepository.deleteById(id);
    }
}
