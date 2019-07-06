package ir.samta.project.web.rest;

import io.github.jhipster.web.util.ResponseUtil;
import ir.samta.project.service.PhaseService;
import ir.samta.project.service.dto.PhaseDTO;
import ir.samta.project.web.rest.errors.BadRequestAlertException;
import ir.samta.project.web.rest.util.HeaderUtil;
import ir.samta.project.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Phase.
 */
@RestController
@RequestMapping("/api")
public class PhaseResource {

    private static final String ENTITY_NAME = "phase";
    private final Logger log = LoggerFactory.getLogger(PhaseResource.class);
    private final PhaseService phaseService;

    public PhaseResource(PhaseService phaseService) {
        this.phaseService = phaseService;
    }

    /**
     * POST  /phases : Create a new phase.
     *
     * @param phaseDTO the phaseDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new phaseDTO, or with status 400 (Bad Request) if the phase has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/phases")
    public ResponseEntity<PhaseDTO> createPhase(@RequestBody PhaseDTO phaseDTO) throws URISyntaxException {
        log.debug("REST request to save Phase : {}", phaseDTO);
        if (phaseDTO.getId() != null) {
            throw new BadRequestAlertException("A new phase cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PhaseDTO result = phaseService.save(phaseDTO);
        return ResponseEntity.created(new URI("/api/phases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /phases : Updates an existing phase.
     *
     * @param phaseDTO the phaseDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated phaseDTO,
     * or with status 400 (Bad Request) if the phaseDTO is not valid,
     * or with status 500 (Internal Server Error) if the phaseDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/phases")
    public ResponseEntity<PhaseDTO> updatePhase(@RequestBody PhaseDTO phaseDTO) throws URISyntaxException {
        log.debug("REST request to update Phase : {}", phaseDTO);
        if (phaseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PhaseDTO result = phaseService.save(phaseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, phaseDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /phases : get all the phases.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of phases in body
     */
    @GetMapping("/phases/{projectId}/project")
    public ResponseEntity<List<PhaseDTO>> getAllPhases(@PathVariable Long projectId, Pageable pageable) {
        log.debug("REST request to get a page of Phases");
        List<PhaseDTO> page = phaseService.findAll(projectId, pageable);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /phases/:id : get the "id" phase.
     *
     * @param id the id of the phaseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the phaseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/phases/{id}")
    public ResponseEntity<PhaseDTO> getPhase(@PathVariable Long id) {
        log.debug("REST request to get Phase : {}", id);
        Optional<PhaseDTO> phaseDTO = phaseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(phaseDTO);
    }

    /**
     * DELETE  /phases/:id : delete the "id" phase.
     *
     * @param id the id of the phaseDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/phases/{id}")
    public ResponseEntity<Void> deletePhase(@PathVariable Long id) {
        log.debug("REST request to delete Phase : {}", id);
        phaseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
