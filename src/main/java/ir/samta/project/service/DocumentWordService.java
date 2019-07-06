package ir.samta.project.service;

import ir.samta.project.domain.DocumentWord;
import ir.samta.project.repository.DocumentWordRepository;
import ir.samta.project.service.dto.DocumentWordDTO;
import ir.samta.project.service.mapper.DocumentWordMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


/**
 * Service Implementation for managing DocumentWord.
 */
@Service
@Transactional
public class DocumentWordService {

    private final Logger log = LoggerFactory.getLogger(DocumentWordService.class);

    private final DocumentWordRepository documentWordRepository;

    private final DocumentWordMapper documentWordMapper;


    public DocumentWordService(DocumentWordRepository documentWordRepository, DocumentWordMapper documentWordMapper) {
        this.documentWordRepository = documentWordRepository;
        this.documentWordMapper = documentWordMapper;
    }

    /**
     * Save a documentWord.
     *
     * @param documentWordDTO the entity to save
     * @return the persisted entity
     */
    public DocumentWordDTO save(DocumentWordDTO documentWordDTO) {
        log.debug("Request to save DocumentWord : {}", documentWordDTO);
        DocumentWord documentWord = documentWordMapper.toEntity(documentWordDTO);
        documentWordRepository.deleteAllByDocument_IdAndType(documentWordDTO.getDocumentId(), documentWordDTO.getType());
        documentWord = documentWordRepository.save(documentWord);
        DocumentWordDTO result = documentWordMapper.toDto(documentWord);
        return result;
    }

    /**
     * Get all the documentWords.
     *
     * @param documentId
     * @param pageable   the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<DocumentWordDTO> findAll(Long documentId, Pageable pageable) {
        log.debug("Request to get all DocumentWords");
        return documentWordRepository.findAllByDocument_Id(documentId, pageable)
            .map(documentWordMapper::toDto);
    }


    /**
     * Get one documentWord by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<DocumentWordDTO> findOne(Long id) {
        log.debug("Request to get DocumentWord : {}", id);
        return documentWordRepository.findById(id)
            .map(documentWordMapper::toDto);
    }

    /**
     * Delete the documentWord by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DocumentWord : {}", id);
        documentWordRepository.deleteById(id);
    }
}
