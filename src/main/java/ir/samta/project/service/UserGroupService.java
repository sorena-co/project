package ir.samta.project.service;

import ir.samta.project.domain.UserGroup;
import ir.samta.project.repository.UserGroupRepository;
import ir.samta.project.service.dto.UserGroupDTO;
import ir.samta.project.service.mapper.UserGroupMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;



/**
 * Service Implementation for managing UserGroup.
 */
@Service
@Transactional
public class UserGroupService {

    private final Logger log = LoggerFactory.getLogger(UserGroupService.class);

    private final UserGroupRepository userGroupRepository;

    private final UserGroupMapper userGroupMapper;

    public UserGroupService(UserGroupRepository userGroupRepository, UserGroupMapper userGroupMapper) {
        this.userGroupRepository = userGroupRepository;
        this.userGroupMapper = userGroupMapper;
    }

    /**
     * Save a userGroup.
     *
     * @param userGroupDTO the entity to save
     * @return the persisted entity
     */
    public UserGroupDTO save(UserGroupDTO userGroupDTO) {
        log.debug("Request to save UserGroup : {}", userGroupDTO);
        UserGroup userGroup = userGroupMapper.toEntity(userGroupDTO);
        userGroup = userGroupRepository.save(userGroup);
        UserGroupDTO result = userGroupMapper.toDto(userGroup);
        return result;
    }

    /**
     * Get all the userGroups.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UserGroupDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UserGroups");
        return userGroupRepository.findAll(pageable)
            .map(userGroupMapper::toDto);
    }


    /**
     * Get one userGroup by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<UserGroupDTO> findOne(Long id) {
        log.debug("Request to get UserGroup : {}", id);
        return userGroupRepository.findById(id)
            .map(userGroupMapper::toDto);
    }

    /**
     * Delete the userGroup by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserGroup : {}", id);
        userGroupRepository.deleteById(id);
    }
}
