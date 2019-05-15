package ir.samta.project.web.rest;
import ir.samta.project.service.OrganizationPartnerService;
import ir.samta.project.web.rest.errors.BadRequestAlertException;
import ir.samta.project.web.rest.util.HeaderUtil;
import ir.samta.project.web.rest.util.PaginationUtil;
import ir.samta.project.service.dto.OrganizationPartnerDTO;
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
 * REST controller for managing OrganizationPartner.
 */
@RestController
@RequestMapping("/api")
public class OrganizationPartnerResource {

    private final Logger log = LoggerFactory.getLogger(OrganizationPartnerResource.class);

    private static final String ENTITY_NAME = "organizationPartner";

    private final OrganizationPartnerService organizationPartnerService;

    public OrganizationPartnerResource(OrganizationPartnerService organizationPartnerService) {
        this.organizationPartnerService = organizationPartnerService;
    }

    /**
     * POST  /organization-partners : Create a new organizationPartner.
     *
     * @param organizationPartnerDTO the organizationPartnerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new organizationPartnerDTO, or with status 400 (Bad Request) if the organizationPartner has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/organization-partners")
    public ResponseEntity<OrganizationPartnerDTO> createOrganizationPartner(@RequestBody OrganizationPartnerDTO organizationPartnerDTO) throws URISyntaxException {
        log.debug("REST request to save OrganizationPartner : {}", organizationPartnerDTO);
        if (organizationPartnerDTO.getId() != null) {
            throw new BadRequestAlertException("A new organizationPartner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrganizationPartnerDTO result = organizationPartnerService.save(organizationPartnerDTO);
        return ResponseEntity.created(new URI("/api/organization-partners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /organization-partners : Updates an existing organizationPartner.
     *
     * @param organizationPartnerDTO the organizationPartnerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated organizationPartnerDTO,
     * or with status 400 (Bad Request) if the organizationPartnerDTO is not valid,
     * or with status 500 (Internal Server Error) if the organizationPartnerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/organization-partners")
    public ResponseEntity<OrganizationPartnerDTO> updateOrganizationPartner(@RequestBody OrganizationPartnerDTO organizationPartnerDTO) throws URISyntaxException {
        log.debug("REST request to update OrganizationPartner : {}", organizationPartnerDTO);
        if (organizationPartnerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrganizationPartnerDTO result = organizationPartnerService.save(organizationPartnerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, organizationPartnerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /organization-partners : get all the organizationPartners.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of organizationPartners in body
     */
    @GetMapping("/organization-partners")
    public ResponseEntity<List<OrganizationPartnerDTO>> getAllOrganizationPartners(Pageable pageable) {
        log.debug("REST request to get a page of OrganizationPartners");
        Page<OrganizationPartnerDTO> page = organizationPartnerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/organization-partners");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /organization-partners/:id : get the "id" organizationPartner.
     *
     * @param id the id of the organizationPartnerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the organizationPartnerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/organization-partners/{id}")
    public ResponseEntity<OrganizationPartnerDTO> getOrganizationPartner(@PathVariable Long id) {
        log.debug("REST request to get OrganizationPartner : {}", id);
        Optional<OrganizationPartnerDTO> organizationPartnerDTO = organizationPartnerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(organizationPartnerDTO);
    }

    /**
     * DELETE  /organization-partners/:id : delete the "id" organizationPartner.
     *
     * @param id the id of the organizationPartnerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/organization-partners/{id}")
    public ResponseEntity<Void> deleteOrganizationPartner(@PathVariable Long id) {
        log.debug("REST request to delete OrganizationPartner : {}", id);
        organizationPartnerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/organization-partners?query=:query : search for the organizationPartner corresponding
     * to the query.
     *
     * @param query the query of the organizationPartner search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/organization-partners")
    public ResponseEntity<List<OrganizationPartnerDTO>> searchOrganizationPartners(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of OrganizationPartners for query {}", query);
        Page<OrganizationPartnerDTO> page = organizationPartnerService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/organization-partners");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
