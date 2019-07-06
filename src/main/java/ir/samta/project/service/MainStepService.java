package ir.samta.project.service;

import ir.samta.project.domain.MainStep;
import ir.samta.project.repository.MainStepRepository;
import ir.samta.project.service.dto.MainStepDTO;
import ir.samta.project.service.mapper.MainStepMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


/**
 * Service Implementation for managing MainStep.
 */
@Service
@Transactional
public class MainStepService {

    private final Logger log = LoggerFactory.getLogger(MainStepService.class);

    private final MainStepRepository mainStepRepository;

    private final MainStepMapper mainStepMapper;


    public MainStepService(MainStepRepository mainStepRepository, MainStepMapper mainStepMapper) {
        this.mainStepRepository = mainStepRepository;
        this.mainStepMapper = mainStepMapper;
    }

    /**
     * Save a mainStep.
     *
     * @param mainStepDTO the entity to save
     * @return the persisted entity
     */
    public MainStepDTO save(MainStepDTO mainStepDTO) {
        log.debug("Request to save MainStep : {}", mainStepDTO);
        MainStep mainStep = mainStepMapper.toEntity(mainStepDTO);
        mainStep = mainStepRepository.save(mainStep);
        MainStepDTO result = mainStepMapper.toDto(mainStep);
        return result;
    }

    /**
     * Get all the mainSteps.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MainStepDTO> findAll(Pageable pageable) {
        log.debug("Request to get all MainSteps");
        return mainStepRepository.findAll(pageable)
            .map(mainStepMapper::toDto);
    }


    /**
     * Get one mainStep by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<MainStepDTO> findOne(Long id) {
        log.debug("Request to get MainStep : {}", id);
        return mainStepRepository.findById(id)
            .map(mainStepMapper::toDto);
    }

    /**
     * Delete the mainStep by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete MainStep : {}", id);
        mainStepRepository.deleteById(id);
    }
}
