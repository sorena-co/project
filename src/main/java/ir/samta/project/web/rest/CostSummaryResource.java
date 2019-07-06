package ir.samta.project.web.rest;
import ir.samta.project.service.CostSummaryService;
import ir.samta.project.web.rest.errors.BadRequestAlertException;
import ir.samta.project.web.rest.util.HeaderUtil;
import ir.samta.project.web.rest.util.PaginationUtil;
import ir.samta.project.service.dto.CostSummaryDTO;
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



/**
 * REST controller for managing CostSummary.
 */
@RestController
@RequestMapping("/api")
public class CostSummaryResource {

    private final Logger log = LoggerFactory.getLogger(CostSummaryResource.class);

    private static final String ENTITY_NAME = "costSummary";

    private final CostSummaryService costSummaryService;

    public CostSummaryResource(CostSummaryService costSummaryService) {
        this.costSummaryService = costSummaryService;
    }

    /**
     * POST  /cost-summaries : Create a new costSummary.
     *
     * @param costSummaryDTO the costSummaryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new costSummaryDTO, or with status 400 (Bad Request) if the costSummary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cost-summaries")
    public ResponseEntity<CostSummaryDTO> createCostSummary(@RequestBody CostSummaryDTO costSummaryDTO) throws URISyntaxException {
        log.debug("REST request to save CostSummary : {}", costSummaryDTO);
        if (costSummaryDTO.getId() != null) {
            throw new BadRequestAlertException("A new costSummary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CostSummaryDTO result = costSummaryService.save(costSummaryDTO);
        return ResponseEntity.created(new URI("/api/cost-summaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cost-summaries : Updates an existing costSummary.
     *
     * @param costSummaryDTO the costSummaryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated costSummaryDTO,
     * or with status 400 (Bad Request) if the costSummaryDTO is not valid,
     * or with status 500 (Internal Server Error) if the costSummaryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cost-summaries")
    public ResponseEntity<CostSummaryDTO> updateCostSummary(@RequestBody CostSummaryDTO costSummaryDTO) throws URISyntaxException {
        log.debug("REST request to update CostSummary : {}", costSummaryDTO);
        if (costSummaryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CostSummaryDTO result = costSummaryService.save(costSummaryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, costSummaryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cost-summaries : get all the costSummaries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of costSummaries in body
     */
    @GetMapping("/cost-summaries")
    public ResponseEntity<List<CostSummaryDTO>> getAllCostSummaries(Pageable pageable) {
        log.debug("REST request to get a page of CostSummaries");
        Page<CostSummaryDTO> page = costSummaryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cost-summaries");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /cost-summaries/:id : get the "id" costSummary.
     *
     * @param id the id of the costSummaryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the costSummaryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cost-summaries/{id}")
    public ResponseEntity<CostSummaryDTO> getCostSummary(@PathVariable Long id) {
        log.debug("REST request to get CostSummary : {}", id);
        Optional<CostSummaryDTO> costSummaryDTO = costSummaryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(costSummaryDTO);
    }

    /**
     * DELETE  /cost-summaries/:id : delete the "id" costSummary.
     *
     * @param id the id of the costSummaryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cost-summaries/{id}")
    public ResponseEntity<Void> deleteCostSummary(@PathVariable Long id) {
        log.debug("REST request to delete CostSummary : {}", id);
        costSummaryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
