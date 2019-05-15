package ir.samta.project.service;

import ir.samta.project.domain.Documents;
import ir.samta.project.domain.MainStep;
import ir.samta.project.repository.DocumentRepository;
import ir.samta.project.repository.MainStepRepository;
import ir.samta.project.repository.search.DocumentSearchRepository;
import ir.samta.project.service.dto.DocumentDTO;
import ir.samta.project.service.mapper.DocumentMapper;
import ir.samta.project.service.mapper.MainStepMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * Service Implementation for managing Document.
 */
@Service
@Transactional
public class DocumentService {

    private final Logger log = LoggerFactory.getLogger(DocumentService.class);

    private final DocumentRepository documentRepository;

    private final DocumentMapper documentMapper;

    private final DocumentSearchRepository documentSearchRepository;

    private final MainStepMapper mainStepMapper;
    private final MainStepRepository mainStepRepository;

    public DocumentService(DocumentRepository documentRepository, DocumentMapper documentMapper, DocumentSearchRepository documentSearchRepository, MainStepMapper mainStepMapper, MainStepRepository mainStepRepository) {
        this.documentRepository = documentRepository;
        this.documentMapper = documentMapper;
        this.documentSearchRepository = documentSearchRepository;
        this.mainStepMapper = mainStepMapper;
        this.mainStepRepository = mainStepRepository;
    }

    /**
     * Save a document.
     *
     * @param documentDTO the entity to save
     * @return the persisted entity
     */
    public DocumentDTO save(DocumentDTO documentDTO) {
        log.debug("Request to save Document : {}", documentDTO);
        Documents document = documentMapper.toEntity(documentDTO);
        document = documentRepository.save(document);
        DocumentDTO result = documentMapper.toDto(document);
        documentSearchRepository.save(document);

        List<MainStep> mainSteps = mainStepMapper.toEntity(documentDTO.getMainSteps());
        for (MainStep mainStep : mainSteps) {
            mainStep.setDocument(document);
        }
        mainStepRepository.saveAll(mainSteps);
        return result;
    }

    /**
     * Get all the documents.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<DocumentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Documents");
        return documentRepository.findAll(pageable)
            .map(documentMapper::toDto);
    }


    /**
     * Get one document by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<DocumentDTO> findOne(Long id) {
        log.debug("Request to get Document : {}", id);
        return documentRepository.findById(id)
            .map(documentMapper::toDto);
    }

    /**
     * Delete the document by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Document : {}", id);
        documentRepository.deleteById(id);
        documentSearchRepository.deleteById(id);
    }

    /**
     * Search for the document corresponding to the query.
     *
     * @param query    the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<DocumentDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Documents for query {}", query);
        return documentSearchRepository.search(queryStringQuery(query), pageable)
            .map(documentMapper::toDto);
    }
}
