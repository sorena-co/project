package ir.samta.project.service;

import ir.samta.project.domain.CostSummary;
import ir.samta.project.repository.CostSummaryRepository;
import ir.samta.project.service.dto.CostSummaryDTO;
import ir.samta.project.service.mapper.CostSummaryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;



/**
 * Service Implementation for managing CostSummary.
 */
@Service
@Transactional
public class CostSummaryService {

    private final Logger log = LoggerFactory.getLogger(CostSummaryService.class);

    private final CostSummaryRepository costSummaryRepository;

    private final CostSummaryMapper costSummaryMapper;


    public CostSummaryService(CostSummaryRepository costSummaryRepository, CostSummaryMapper costSummaryMapper) {
        this.costSummaryRepository = costSummaryRepository;
        this.costSummaryMapper = costSummaryMapper;
    }

    /**
     * Save a costSummary.
     *
     * @param costSummaryDTO the entity to save
     * @return the persisted entity
     */
    public CostSummaryDTO save(CostSummaryDTO costSummaryDTO) {
        log.debug("Request to save CostSummary : {}", costSummaryDTO);
        CostSummary costSummary = costSummaryMapper.toEntity(costSummaryDTO);
        costSummary = costSummaryRepository.save(costSummary);
        CostSummaryDTO result = costSummaryMapper.toDto(costSummary);
        return result;
    }

    /**
     * Get all the costSummaries.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CostSummaryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CostSummaries");
        return costSummaryRepository.findAll(pageable)
            .map(costSummaryMapper::toDto);
    }


    /**
     * Get one costSummary by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<CostSummaryDTO> findOne(Long id) {
        log.debug("Request to get CostSummary : {}", id);
        return costSummaryRepository.findById(id)
            .map(costSummaryMapper::toDto);
    }

    /**
     * Delete the costSummary by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CostSummary : {}", id);
        costSummaryRepository.deleteById(id);
    }
}
