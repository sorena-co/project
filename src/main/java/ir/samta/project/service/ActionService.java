package ir.samta.project.service;

import ir.samta.project.domain.Action;
import ir.samta.project.repository.ActionRepository;
import ir.samta.project.repository.search.ActionSearchRepository;
import ir.samta.project.service.dto.ActionDTO;
import ir.samta.project.service.mapper.ActionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Action.
 */
@Service
@Transactional
public class ActionService {

    private final Logger log = LoggerFactory.getLogger(ActionService.class);

    private final ActionRepository actionRepository;

    private final ActionMapper actionMapper;

    private final ActionSearchRepository actionSearchRepository;

    public ActionService(ActionRepository actionRepository, ActionMapper actionMapper, ActionSearchRepository actionSearchRepository) {
        this.actionRepository = actionRepository;
        this.actionMapper = actionMapper;
        this.actionSearchRepository = actionSearchRepository;
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
        actionSearchRepository.save(action);
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
        actionSearchRepository.deleteById(id);
    }

    /**
     * Search for the action corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ActionDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Actions for query {}", query);
        return actionSearchRepository.search(queryStringQuery(query), pageable)
            .map(actionMapper::toDto);
    }
}
