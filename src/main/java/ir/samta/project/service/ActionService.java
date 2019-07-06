package ir.samta.project.service;

import ir.samta.project.domain.Action;
import ir.samta.project.repository.ActionRepository;
import ir.samta.project.service.dto.ActionDTO;
import ir.samta.project.service.mapper.ActionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;



/**
 * Service Implementation for managing Action.
 */
@Service
@Transactional
public class ActionService {

    private final Logger log = LoggerFactory.getLogger(ActionService.class);

    private final ActionRepository actionRepository;

    private final ActionMapper actionMapper;


    public ActionService(ActionRepository actionRepository, ActionMapper actionMapper) {
        this.actionRepository = actionRepository;
        this.actionMapper = actionMapper;
    }

    /**
     * Save a action.
     *
     * @param actionDTO the entity to save
     * @return the persisted entity
     */
    public ActionDTO save(ActionDTO actionDTO) {
        log.debug("Request to save Action : {}", actionDTO);
        Action action = actionMapper.toEntity(actionDTO);
        action = actionRepository.save(action);
        ActionDTO result = actionMapper.toDto(action);
        return result;
    }

    /**
     * Get all the actions.
     *
     *
     * @param phaseId
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ActionDTO> findAll(Long phaseId, Pageable pageable) {
        log.debug("Request to get all Actions");
        return actionRepository.findAllByPhase_Id(phaseId,pageable)
            .map(actionMapper::toDto);
    }


    /**
     * Get one action by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ActionDTO> findOne(Long id) {
        log.debug("Request to get Action : {}", id);
        return actionRepository.findById(id)
            .map(actionMapper::toDto);
    }

    /**
     * Delete the action by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Action : {}", id);
        actionRepository.deleteById(id);
    }

    public Page<ActionDTO> findAllByProject(Long projectId, Pageable pageable) {
        return actionRepository.findAllByPhase_Project_Id(projectId,pageable)
            .map(actionMapper::toDto);
    }
}
