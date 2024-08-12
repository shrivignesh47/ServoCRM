package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Whatsappmarketing;
import com.mycompany.myapp.repository.WhatsappmarketingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Whatsappmarketing}.
 */
@Service
public class WhatsappmarketingService {

    private static final Logger log = LoggerFactory.getLogger(WhatsappmarketingService.class);

    private final WhatsappmarketingRepository whatsappmarketingRepository;

    public WhatsappmarketingService(WhatsappmarketingRepository whatsappmarketingRepository) {
        this.whatsappmarketingRepository = whatsappmarketingRepository;
    }

    /**
     * Save a whatsappmarketing.
     *
     * @param whatsappmarketing the entity to save.
     * @return the persisted entity.
     */
    public Mono<Whatsappmarketing> save(Whatsappmarketing whatsappmarketing) {
        log.debug("Request to save Whatsappmarketing : {}", whatsappmarketing);
        return whatsappmarketingRepository.save(whatsappmarketing);
    }

    /**
     * Update a whatsappmarketing.
     *
     * @param whatsappmarketing the entity to save.
     * @return the persisted entity.
     */
    public Mono<Whatsappmarketing> update(Whatsappmarketing whatsappmarketing) {
        log.debug("Request to update Whatsappmarketing : {}", whatsappmarketing);
        return whatsappmarketingRepository.save(whatsappmarketing);
    }

    /**
     * Partially update a whatsappmarketing.
     *
     * @param whatsappmarketing the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<Whatsappmarketing> partialUpdate(Whatsappmarketing whatsappmarketing) {
        log.debug("Request to partially update Whatsappmarketing : {}", whatsappmarketing);

        return whatsappmarketingRepository
            .findById(whatsappmarketing.getId())
            .map(existingWhatsappmarketing -> {
                if (whatsappmarketing.getName() != null) {
                    existingWhatsappmarketing.setName(whatsappmarketing.getName());
                }
                if (whatsappmarketing.getStatus() != null) {
                    existingWhatsappmarketing.setStatus(whatsappmarketing.getStatus());
                }
                if (whatsappmarketing.getCreated_On() != null) {
                    existingWhatsappmarketing.setCreated_On(whatsappmarketing.getCreated_On());
                }
                if (whatsappmarketing.getCreated_by() != null) {
                    existingWhatsappmarketing.setCreated_by(whatsappmarketing.getCreated_by());
                }
                if (whatsappmarketing.getRecipents() != null) {
                    existingWhatsappmarketing.setRecipents(whatsappmarketing.getRecipents());
                }
                if (whatsappmarketing.getReport() != null) {
                    existingWhatsappmarketing.setReport(whatsappmarketing.getReport());
                }
                if (whatsappmarketing.getAction() != null) {
                    existingWhatsappmarketing.setAction(whatsappmarketing.getAction());
                }

                return existingWhatsappmarketing;
            })
            .flatMap(whatsappmarketingRepository::save);
    }

    /**
     * Get all the whatsappmarketings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Flux<Whatsappmarketing> findAll(Pageable pageable) {
        log.debug("Request to get all Whatsappmarketings");
        return whatsappmarketingRepository.findAllBy(pageable);
    }

    /**
     * Get all the whatsappmarketings with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Flux<Whatsappmarketing> findAllWithEagerRelationships(Pageable pageable) {
        return whatsappmarketingRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Returns the number of whatsappmarketings available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return whatsappmarketingRepository.count();
    }

    /**
     * Get one whatsappmarketing by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<Whatsappmarketing> findOne(String id) {
        log.debug("Request to get Whatsappmarketing : {}", id);
        return whatsappmarketingRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the whatsappmarketing by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete Whatsappmarketing : {}", id);
        return whatsappmarketingRepository.deleteById(id);
    }
}
