package ir.samta.project.web.rest;
import ir.samta.project.service.ResearcherHistoryService;
import ir.samta.project.web.rest.errors.BadRequestAlertException;
import ir.samta.project.web.rest.util.HeaderUtil;
import ir.samta.project.web.rest.util.PaginationUtil;
import ir.samta.project.service.dto.ResearcherHistoryDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing ResearcherHistory.
 */
@RestController
@RequestMapping("/api")
public class ResearcherHistoryResource {

    private final Logger log = LoggerFactory.getLogger(ResearcherHistoryResource.class);

    private static final String ENTITY_NAME = "researcherHistory";

    private final ResearcherHistoryService researcherHistoryService;

    public ResearcherHistoryResource(ResearcherHistoryService researcherHistoryService) {
        this.researcherHistoryService = researcherHistoryService;
    }

    /**
     * POST  /researcher-histories : Create a new researcherHistory.
     *
     * @param researcherHistoryDTO the researcherHistoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new researcherHistoryDTO, or with status 400 (Bad Request) if the researcherHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/researcher-histories")
    public ResponseEntity<ResearcherHistoryDTO> createResearcherHistory(@RequestBody ResearcherHistoryDTO researcherHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save ResearcherHistory : {}", researcherHistoryDTO);
        if (researcherHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new researcherHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ResearcherHistoryDTO result = researcherHistoryService.save(researcherHistoryDTO);
        return ResponseEntity.created(new URI("/api/researcher-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /researcher-histories : Updates an existing researcherHistory.
     *
     * @param researcherHistoryDTO the researcherHistoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated researcherHistoryDTO,
     * or with status 400 (Bad Request) if the researcherHistoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the researcherHistoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/researcher-histories")
    public ResponseEntity<ResearcherHistoryDTO> updateResearcherHistory(@RequestBody ResearcherHistoryDTO researcherHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update ResearcherHistory : {}", researcherHistoryDTO);
        if (researcherHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ResearcherHistoryDTO result = researcherHistoryService.save(researcherHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, researcherHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /researcher-histories : get all the researcherHistories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of researcherHistories in body
     */
    @GetMapping("/researcher-histories")
    public ResponseEntity<List<ResearcherHistoryDTO>> getAllResearcherHistories(Pageable pageable) {
        log.debug("REST request to get a page of ResearcherHistories");
        Page<ResearcherHistoryDTO> page = researcherHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/researcher-histories");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /researcher-histories/:id : get the "id" researcherHistory.
     *
     * @param id the id of the researcherHistoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the researcherHistoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/researcher-histories/{id}")
    public ResponseEntity<ResearcherHistoryDTO> getResearcherHistory(@PathVariable Long id) {
        log.debug("REST request to get ResearcherHistory : {}", id);
        Optional<ResearcherHistoryDTO> researcherHistoryDTO = researcherHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(researcherHistoryDTO);
    }

    /**
     * DELETE  /researcher-histories/:id : delete the "id" researcherHistory.
     *
     * @param id the id of the researcherHistoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/researcher-histories/{id}")
    public ResponseEntity<Void> deleteResearcherHistory(@PathVariable Long id) {
        log.debug("REST request to delete ResearcherHistory : {}", id);
        researcherHistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/researcher-histories?query=:query : search for the researcherHistory corresponding
     * to the query.
     *
     * @param query the query of the researcherHistory search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/researcher-histories")
    public ResponseEntity<List<ResearcherHistoryDTO>> searchResearcherHistories(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of ResearcherHistories for query {}", query);
        Page<ResearcherHistoryDTO> page = researcherHistoryService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/researcher-histories");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
